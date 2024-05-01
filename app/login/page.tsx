'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Login() {
    const [loginMethod, setLoginMethod] = useState('');
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');
    const [minecraftUsername, setMinecraftUsername] = useState('');
    const [minecraftPassword, setMinecraftPassword] = useState('');

    useEffect(() => {
        const url = new URL(window.location.href);
        const method = url.searchParams.get('method');
        if (method&&['local','minecraft','discord'].includes(method)) {
            setLoginMethod(method);
        }
        else {
            setLoginMethod("local");
        }
    }, []);
    
    const handleLocalLogin = () => {
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'login/local',
            data: {
                username: localUsername,
                password: localPassword,
                register: false
            },
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                location.href = '/';
            });
    };

    const handleMinecraftLogin = () => {
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'login/minecraft',
            data: {
                username: minecraftUsername,
                password: minecraftPassword
            },
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                location.href = '/';
            });
    }
    
    return (
        <div>
            <h1>Login</h1>
            <div className='tab'>
                <button className={loginMethod==="local"?"active":""} onClick={() => setLoginMethod("local")}>Local</button>
                <button className={loginMethod==="minecraft"?"active":""} onClick={() => setLoginMethod("minecraft")}>Minecraft</button>
                <button className={loginMethod==="discord"?"active":""} onClick={() => setLoginMethod("discord")}>Discord</button>
            </div>
            {loginMethod==="local"&&<>
                <div className='formtab'>
                    <input className='form'
                    type="text"
                    placeholder="Username"
                    value={localUsername}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    />
                    <input className='form'
                        type="password"
                        placeholder="Password"
                        value={localPassword}
                        onChange={(e) => setLocalPassword(e.target.value)}
                    />
                    <button className='form' onClick={handleLocalLogin}>Login</button>
                    <Link className='form center' href="/register">Register instead?</Link>
                </div>
            </>
            }
            {loginMethod==="minecraft"&&<>
                <div className='formtab'>
                    <input className='form'
                    type="text"
                    placeholder="Username"
                    value={minecraftUsername}
                    onChange={(e) => setMinecraftUsername(e.target.value)}
                    />
                    <input className='form'
                        type="password"
                        placeholder="Password"
                        value={minecraftPassword}
                        onChange={(e) => setMinecraftPassword(e.target.value)}
                    />
                    <button className='form' onClick={handleMinecraftLogin}>Login</button>
                </div>
                <h3>In order to register your Minecraft Account and gain points through it,</h3>
                <h3>join the mc.masterbaseguild.it server and perform the /register command.</h3>
            </>
            }
            {loginMethod==="discord"&&<>
                <div className='formtab'>
                    <a className='form center' href={process.env.NEXT_PUBLIC_API_ENDPOINT+'login/discord'}>
                        Login with Discord
                    </a>
                </div>
                <h3>In order to gain points through your Discord Account,</h3>
                <h3>join the <a href="https://discord.gg/R66FeFh8aC" target="_blank" rel="noreferrer">MasterBase Discord Server</a> and link your account.</h3>
            </>
            }
			<Link className='button' href="/">Home</Link>
        </div>
    );
}