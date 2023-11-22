'use client'

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        axios({
            method: 'post',
            url: process.env.API_ENDPOINT+'login',
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
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>[ Login ]</button>
			<Link href="/">[ Home ]</Link>
        </div>
    );
}