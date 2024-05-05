'use client'

import { useState, useEffect } from 'react';
import { useGlobalContext } from '../Context/store';
import axios from 'axios';
import Link from 'next/link';

export default function CreateGuild() {
    const [userData, setUserData] = useState<any>(null);
    const [guildDisplay, setGuildDisplay] = useState('');

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user',
            withCredentials: true
        })
            .then(user => {
                console.log(user.data);
                setUserData(user.data);
            });
    });
    
    const handlePost = () => {
        if(!guildDisplay) return;
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'guild',
            data: {
                display: guildDisplay,
                player: userData.id
            },
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                location.href = '/guilds';
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Create Guild</h1>
            <div className='formtab'>
                <input className='form' type='text' placeholder='Display Name' onChange={(e) => setGuildDisplay(e.target.value)} />
                <button className='form' onClick={handlePost}>Create</button>
            </div>
            <Link className='button' href="/">Home</Link>
        </div>
    );
}