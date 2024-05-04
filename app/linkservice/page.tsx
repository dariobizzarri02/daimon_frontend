'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function LinkService() {
    const [userData, setUserData] = useState<any>(null);
    const [loginMethod, setLoginMethod] = useState('');
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');
    const [localRepeat, setLocalRepeat] = useState('');
    const [minecraftUsername, setMinecraftUsername] = useState('');
    const [minecraftPassword, setMinecraftPassword] = useState('');

    useEffect(() => {
        const url = new URL(window.location.href);
        const method = url.searchParams.get('method');
        if (method&&['local','minecraft','discord'].includes(method)) {
            setLoginMethod(method);
        }
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user',
            withCredentials: true
        })
            .then(user => {
                console.log(user.data);
                axios({
                    method: 'get',
                    url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user/auths',
                    withCredentials: true
                })
                    .then(response => {
                        console.log(response.data);
                        setUserData({user: user.data, auths: response.data});
                    })
            })
            .catch(error => {
                console.error(error);
                location.href = '/login';
            });
    }, []);
    
    const handleLocalLogin = () => {
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'login/local',
            data: {
                username: localUsername,
                password: localPassword,
                register: true
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
                location.href = '/account';
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
                location.href = '/account';
            });
    }
    
    return (
        <div>
            <h1>Link Service</h1>
            <div className='tab'>
                {userData&&userData.auths&&!userData.auths.local&&(<button className={loginMethod==="local"?"active":""} onClick={() => setLoginMethod("local")}>Local</button>)}
                {userData&&userData.auths&&!userData.auths.minecraft&&(<button className={loginMethod==="minecraft"?"active":""} onClick={() => setLoginMethod("minecraft")}>Minecraft</button>)}
                {userData&&userData.auths&&!userData.auths.discord&&(<button className={loginMethod==="discord"?"active":""} onClick={() => setLoginMethod("discord")}>Discord</button>)}
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
					<input className='form'
						type="password"
						placeholder="Repeat Password"
						value={localRepeat}
						onChange={(e) => setLocalRepeat(e.target.value)}
					/>
                    <button className='form' onClick={handleLocalLogin}>Register</button>
                </div>
                {localPassword!==localRepeat&&localRepeat.length>0&&<h3 className="error">Passwords do not match</h3>}
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