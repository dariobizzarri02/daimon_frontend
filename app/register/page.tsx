'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Register() {
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');
	const [localRepeat, setLocalRepeat] = useState('');
    
    const handleLocalRegister = () => {
		if (localPassword!==localRepeat||localPassword.length<0||localUsername.length<0||localRepeat.length<0) {
			return;
		}
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
                location.href = '/';
            });
    };
    
    return (
        <div>
            <h1>Register</h1>
			<h2>Local Account</h2>
			<>
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
                    <button className='form' onClick={handleLocalRegister}>Register</button>
					<Link className='form center' href="/login">Login instead?</Link>
                </div>
            </>
			{localPassword!==localRepeat&&localRepeat.length>0&&<h3 className="error">Passwords do not match</h3>}
			<Link className='button' href="/">Home</Link>
        </div>
    );
}