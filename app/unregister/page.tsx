'use client'

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Unregister() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUnregister = () => {
        if(!username || !password) return;
        axios({
            method: 'post',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'unregister',
            data: {
                username: username,
                password: password
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

    return (
        <div>
            <h1>Unregister</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleUnregister}>[ Unregister ]</button>
            <Link href="/">[ Home ]</Link>
        </div>
    );
}