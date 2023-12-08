'use client'

import { useState, useEffect } from 'react';
import { useGlobalContext } from '../Context/store';
import axios from 'axios';
import Link from 'next/link';

export default function GuildCreation() {
    const [guildDisplay, setGuildDisplay] = useState('');
    const { character } = useGlobalContext();
    
    const HandlePost = () => {
        if(!guildDisplay) return;
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'guild',
            data: {
                display: guildDisplay,
                character: character
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
            <input type="text" onChange={e => setGuildDisplay(e.target.value)} />
            <button onClick={HandlePost}>[ Create ]</button>
            <Link href="/">[ Home ]</Link>
        </div>
    );
}