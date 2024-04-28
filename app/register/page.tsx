'use client'

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Register() {
	// allowed register strategies: local, discord, minecraft
	const [registerStrategy, selectRegisterStrategy] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = () => {
		axios({
			method: 'post',
			url: process.env.NEXT_PUBLIC_API_ENDPOINT+'login/local',
			data: {
				username: username,
				password: password,
				strategy: registerStrategy
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
			{registerStrategy===''&&<div>
				<button className='form' onClick={() => selectRegisterStrategy('local')}>Local</button>
				<button className='form' onClick={() => selectRegisterStrategy('discord')}>Discord</button>
				<button className='form' onClick={() => selectRegisterStrategy('minecraft')}>Minecraft</button>
				<Link className="button" href="/login">Login</Link>
			</div>}
			{registerStrategy==='local'&&<div>
				<input className='form'
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input className='form'
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='form' onClick={handleRegister}>Register</button>
				<button className='form' onClick={() => selectRegisterStrategy('')}>Back</button>
			</div>}
			{registerStrategy==='discord'&&<div>
				{/* handle discord oauth*/}
				<button className='form' onClick={() => selectRegisterStrategy('')}>Back</button>
			</div>}
			{registerStrategy==='minecraft'&&<div>
				<input className='form'
					type="text"
					placeholder="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input className='form'
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button className='form' onClick={handleRegister}>Register</button>
				<button className='form' onClick={() => selectRegisterStrategy('')}>Back</button>
			</div>}
			<Link className='button' href="/">Home</Link>
		</div>
	);
}