"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useGlobalContext } from "./Context/store";
import { handleAuthentication } from "@/app/commons";

export default function Home () {
	const { authenticated, setAuthenticated } = useGlobalContext();
	const [guilds, setGuilds] = useState<number>(0);

	useEffect(() => {
		handleAuthentication(authenticated, setAuthenticated);
		if(authenticated) axios({
			method: "get",
			url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guilds/count",
			withCredentials: true
		})
			.then(guilds => {
				setGuilds(guilds.data);
			})
	}, []);

	return (
		<main>
			<h1>DAIMON</h1>
			{!authenticated&&<Link className="button" href="/account/login">Login</Link>}
			{authenticated&&<Link className="button" href="/account">Account</Link>}
			{authenticated&&<Link className="button" href="/inbox">Inbox</Link>}
			{authenticated&&!guilds&&<Link className="button" href="/guild/browse">Guilds</Link>}
			{authenticated&&guilds&&<Link className="button" href="/guild/browse/member">Your Guilds</Link>}
			<Link className="button" href="/leaderboard">Leaderboard</Link>
		</main>
	);
}