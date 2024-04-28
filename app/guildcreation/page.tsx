'use client'

import { useState, useEffect } from 'react';
import { useGlobalContext } from '../Context/store';
import axios from 'axios';
import Link from 'next/link';

export default function GuildCreation() {
    const [guildDisplay, setGuildDisplay] = useState('');
    const { player } = useGlobalContext();
    
    const HandlePost = () => {
        if(!guildDisplay) return;
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'guild',
            data: {
                display: guildDisplay,
                player: player
            },
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Guild Creation</h1>
            <input className='form' type="text" onChange={e => setGuildDisplay(e.target.value)} />
            <button className='form' onClick={HandlePost}>Create</button>
            <Link className='button' href="/">Home</Link>
        </div>
    );
}