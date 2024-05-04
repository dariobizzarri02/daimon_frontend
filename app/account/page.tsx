'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Account() {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user',
            withCredentials: true
        })
            .then(user => {
                console.log(user.data);
                if(!user.data.display) {
                    location.href = '/usercreation';
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
                    })
            })
            .catch(error => {
                console.error(error);
                location.href = '/login';
            });
    }, []);

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

    const scoreToLevel = (score:number) => {
        return Math.floor(Math.sqrt(score/125))
    }

    return (
        <div>
            <h1>Account</h1>
            {userData&&userData.user.display&&<div className="card">
                <p>Display Name: {userData.user.display}</p>
                <p className="text">Total Level: {scoreToLevel(userData.user.score)}</p>
                <p className="text">Total Score: {userData.user.score}</p>
            </div>}
            {userData&&userData.auths&&userData.auths.local&&<div className="card">
                <p>Username: @{userData.auths.local.username}</p>
                <button className="close" onClick={()=>{handleUnlink("local")}}/>
            </div>}
            {userData&&userData.auths&&userData.auths.discord&&<div className="card inlineblock">
                <div>
                    <img src="/discord.png" alt="Discord"/>
                    <p>@{userData.auths.discord.discord_username}</p>
                </div>
                <p className="text">Level: {scoreToLevel(userData.auths.discord.score)}</p>
                <p className="text">Score: {userData.auths.discord.score}</p>
                <button className="close" onClick={()=>{handleUnlink("discord")}}/>
            </div>}
            {userData&&userData.auths&&userData.auths.minecraft&&<div className="card inlineblock">
                <div>
                    <img src="/minecraft.png" alt="Minecraft"/>
                    <p>{userData.auths.minecraft.minecraft_username}</p>
                </div>
                <p className="text">Level: {scoreToLevel(userData.auths.minecraft.score)}</p>
                <p className="text">Score: {userData.auths.minecraft.score}</p>
                <button className="close" onClick={()=>{handleUnlink("minecraft")}}/>
            </div>}
            {userData&&userData.auths&&(!userData.auths.local||!userData.auths.discord||!userData.auths.minecraft)&&
                <Link className="plus" href="/linkservice"/>
            }
			{userData&&<button className='button' onClick={handleLogout}>Logout</button>}
            <Link className='button' href="/">Home</Link>
        </div>
    );
}