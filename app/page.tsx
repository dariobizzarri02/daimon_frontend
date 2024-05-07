"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
	const [user, setUser] = useState<any>(null);
	const [guilds, setGuilds] = useState<any[]>([]);

	useEffect(() => {
		axios({
			method: "get",
			url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user",
			withCredentials: true
		})
			.then(user => {
                if(user.data&&!user.data.display) {
                    location.href = "/account/create";
                    return;
                }
				setUser(user.data);
			})
		axios({
			method: "get",
			url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guilds",
			withCredentials: true
		})
			.then(guilds => {
				setGuilds(guilds.data);
			})
	}, []);

	return (
		<main>
			<h1>DAIMON</h1>
			{!user&&<Link className="button" href="/account/login">Login</Link>}
			{user&&<Link className="button" href="/account">Account</Link>}
			{user&&<Link className="button" href="/inbox">Inbox</Link>}
			{(!user||!guilds||!guilds.length)&&<Link className="button" href="/guild/browse">Guilds</Link>}
			{user&&guilds&&guilds.length&&<Link className="button" href="/guild/browse/member">Your Guilds</Link>}
			<Link className="button" href="/leaderboard">Leaderboard</Link>
		</main>
	);
}