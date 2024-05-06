'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import HomeLink from '@/app/homelink';

export default function Settings() {
    const [userData, setUserData] = useState<any>(null);
    const [displayChange, toggleDisplayChange] = useState<boolean>(false);
    const [display, setDisplay] = useState<string>('');
    const [usernameChange, toggleUsernameChange] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [passwordChange, togglePasswordChange] = useState<boolean>(false);
    const [password, setPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user',
            withCredentials: true
        })
            .then(user => {
                console.log(user.data);
                if(!user.data.display) {
                    location.href = '/createplayer';
                    return;
                }
                axios({
                    method: 'get',
                    url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user/auths',
                    withCredentials: true
                })
                    .then(response => {
                        console.log(response.data);
                        setUserData({user: user.data, auths: response.data});
                        setDisplay(user.data.display);
                        setUsername(response.data.local.username);
                    })
            })
            .catch(error => {
                console.error(error);
                location.href = '/login';
            });
    }, [displayChange, usernameChange, passwordChange]);

    const handleLogout = () => {
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'logout',
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

    const handleChangeDisplay = () => {
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'player/display',
            withCredentials: true,
            data: {display: display}
        })
            .then(response => {
                console.log(response.data);
                toggleDisplayChange(false);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleUnlink = (service: string) => {
        axios({
            method: 'delete',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user/auths/'+service,
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                location.reload();
            })
            .catch(error => {
                console.error(error);
            });
    };

    const handleDeleteAccount = () => {
        axios({
            method: 'delete',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user',
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

    const handleChangeUsername = () => {
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user/username',
            withCredentials: true,
            data: {username: username, password: password}
        })
            .then(response => {
                console.log(response.data);
                toggleUsernameChange(false);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const handleChangePassword = () => {
        if(newPassword !== confirmNewPassword) {
            console.error('Passwords do not match');
            return;
        }
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user/password',
            withCredentials: true,
            data: {password: password, newPassword: newPassword}
        })
            .then(response => {
                console.log(response.data);
                togglePasswordChange(false);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <h1>Account Settings</h1>
            {userData&&<div className="card">
                <p>Display Name</p>
                {!displayChange&&<>
                    <p>{userData.user.display}</p>
                    <button className='button' onClick={() => toggleDisplayChange(true)}>Change</button>
                </>}
                {displayChange&&<>
                    <input type='text' value={display} onChange={e => setDisplay(e.target.value)} />
                    <button className='button' onClick={handleChangeDisplay}>Save</button>
                    <button className='button' onClick={() => toggleDisplayChange(false)}>Cancel</button>
                </>}
            </div>}
            {userData&&userData.auths&&userData.auths.local&&<div className="card">
                {!usernameChange&&<>
                    <p>Username: @{userData.auths.local.username}</p>
                    <button className='button' onClick={() => toggleUsernameChange(true)}>Change Username</button>
                </>}
                {usernameChange&&<>
                    <button className='button' onClick={handleChangeUsername}>Save</button>
                    <button className='button' onClick={() => toggleUsernameChange(false)}>Cancel</button>
                    <input type='text' placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                </>}
                {(passwordChange||usernameChange)&&<input type='password' placeholder="password" onChange={e => setPassword(e.target.value)} />}
                {!passwordChange&&<>
                    <p>Password: ********</p>
                    <button className='button' onClick={() => togglePasswordChange(true)}>Change Password</button>
                </>}
                {passwordChange&&<>
                    <input type='password' placeholder="new password" onChange={e => setNewPassword(e.target.value)} />
                    <input type='password' placeholder="confirm new password" onChange={e => setConfirmNewPassword(e.target.value)} />
                    <button className='button' onClick={handleChangePassword}>Save</button>
                    <button className='button' onClick={() => togglePasswordChange(false)}>Cancel</button>
                    {newPassword!==confirmNewPassword&&confirmNewPassword.length>0&&<h3 className="error">Passwords do not match</h3>}
                </>}
                <button className='button' onClick={() => handleUnlink('local')}>Delete Username and Password</button>
            </div>}
            {userData&&userData.auths&&userData.auths.discord&&<div className="card">
                <p>Discord: @{userData.auths.discord.discord_username}</p>
                <button className='button' onClick={() => handleUnlink('discord')}>Unlink</button>
            </div>}
            {userData&&userData.auths&&userData.auths.minecraft&&<div className="card">
                <p>Minecraft: {userData.auths.minecraft.minecraft_username}</p>
                <button className='button' onClick={() => handleUnlink('minecraft')}>Unlink</button>
            </div>}
            {userData&&userData.auths&&(!userData.auths.local||!userData.auths.discord||!userData.auths.minecraft)&&
                <Link className="button" href="/linkservice">Link Another Service</Link>
            }
			{userData&&<button className='button' onClick={handleLogout}>Logout</button>}
            {userData&&<button className='button' onClick={handleDeleteAccount}>Delete Account</button>}
            <HomeLink />
        </div>
    );
}