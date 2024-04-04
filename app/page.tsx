'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
	const [eventData, setEventData] = useState<any>(null);
	const [userData, setUserData] = useState<any>(null);

	useEffect(() => {
		axios({
			method: 'get',
			url: process.env.NEXT_PUBLIC_API_ENDPOINT+'event'
		})
			.then(response => {
                console.log(response.data);
				setEventData(response.data);
			})
			.catch(error => {
				console.error(error);
			});
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
			{eventData&&<h2>Today&apos;s Event: {eventData.display}</h2>}
			{userData&&<h2>( welcome, {userData.username} )</h2>}
			{!userData&&<Link className="button" href="/login">Login</Link>}
			{!userData&&<Link className="button" href="/register">Register</Link>}
			{userData&&<Link className="button" href="/account">Account</Link>}
			{userData&&<Link className="button" href="/characters">Characters</Link>}
			{userData&&<Link className="button" href="/authors">Authors</Link>}
			{userData&&<Link className="button" href="/skills">Skills</Link>}
			<Link className="button" href="/music">Music</Link>
			<Link className="button" href="/browse">Browse</Link>
		</main>
	);
}