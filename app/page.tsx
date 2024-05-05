'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
	const [userData, setUserData] = useState<any>(null);

	useEffect(() => {
		axios({
			method: 'get',
			url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user',
			withCredentials: true
		})
			.then(response => {
				console.log(response.data);
				setUserData(response.data);
			})
			.catch(error => {
				console.error(error);
			});
	}, []);

	return (
		<main>
			<h1>DAIMON</h1>
			{!userData&&<Link className="button" href="/login">Login</Link>}
			{userData&&<Link className="button" href="/account">Account</Link>}
			<Link className="button" href="/guilds">Guilds</Link>
			<Link className="button" href="/leaderboard">Leaderboard</Link>
		</main>
	);
}