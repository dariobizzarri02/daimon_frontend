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
			<p>DAIMON</p>
			{eventData&&<p>* Today's Event: {eventData.display} *</p>}
			{userData&&<p>( welcome, {userData.username} )</p>}
			{!userData&&<Link href="/login">[ Login ]</Link>}
			{!userData&&<Link href="/register">[ Register ]</Link>}
			{userData&&<Link href="/account">[ Account ]</Link>}
			{userData&&<Link href="/characters">[ Characters ]</Link>}
			{userData&&<Link href="/authors">[ Authors ]</Link>}
			{userData&&<Link href="/skills">[ Skills ]</Link>}
			<Link href="/music">[ Music ]</Link>
			<Link href="/browse">[ Browse ]</Link>
		</main>
	);
}