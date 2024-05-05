'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Guilds() {
    const [userData, setUserData] = useState<any>(null);
    const [guildData, setGuildData] = useState<any>(null);

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user',
            withCredentials: true
        })
            .then(user => {
                console.log(user.data);
                axios({
                    method: 'get',
                    url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user/guildowner',
                    withCredentials: true
                })
                    .then(response => {
                        console.log(response.data);
                        setUserData({user: user.data, guild: response.data});
                    })
            })
            .catch(error => {
                console.error(error);
                location.href = '/login';
            });
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'guilds',
            withCredentials: true
        })
            .then(guilds => {
                console.log(guilds.data);
                setGuildData(guilds.data);
            })
    }, []);

    const scoreToLevel = (score:number) => {
        return Math.floor(Math.sqrt(score/125))
    }

    return (
        <div>
            <h1>Guilds</h1>
            {guildData && guildData.map((guild:any) => (
                <div key={guild.score} className='card'>
                    <p>{guild.display}</p>
                    <p className="text" >Level: {scoreToLevel(guild.score)}</p>
                    <p className="text" >Score: {guild.score}</p>
                </div>
            ))}
            {userData&&!userData.guild&&<Link className='button' href="/createguild">Create Guild</Link>}
            <Link className='button' href="/">Home</Link>
        </div>
    );
}