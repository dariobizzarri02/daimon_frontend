'use client'

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Register() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = () => {
		axios({
			method: 'post',
			url: 'http://localhost:3000/register',
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
			});
	};

	return (
		<div>
			<h1>Register</h1>
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
			<button onClick={handleRegister}>[ Register ]</button>
			<Link href="/">[ Home ]</Link>
		</div>
	);
}