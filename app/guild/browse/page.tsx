"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import HomeLink from "@/app/homelink";

export default function GuildBrowse() {
    const [user, setUser] = useState<any>(null);
    const [guild, setGuild] = useState<any>(null);
    const [guilds, setGuilds] = useState<any[]>([]);
    const [lfg, setLfg] = useState<boolean>(false);
    const [allGuilds, setAllGuilds] = useState<any[]>([]);

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
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild",
            withCredentials: true
        })
            .then(guild => {
                setGuild(guild.data);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guilds",
            withCredentials: true
        })
            .then(guilds => {
                setGuilds(guilds.data);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guilds",
            withCredentials: true
        })
            .then(guilds => {
                setAllGuilds(guilds.data);
            })
    }, []);

    const scoreToLevel = (score:number) => {
        return Math.floor(Math.sqrt(score/125))
    }

    const handleLfgToggle = () => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/lfg",
            withCredentials: true
        })
            .then(() => {
                setLfg(!lfg);
            })
    }

    return (
        <div>
            <h1>Guilds</h1>
            {allGuilds && allGuilds.map((guild:any) => (
                <div key={guild.score} className="card">
                    <Link href={"/guild/"+guild.id}><p>{guild.display}</p></Link>
                    <p className="text">Level: {scoreToLevel(guild.score)}</p>
                    <p className="text">Score: {guild.score}</p>
                </div>
            ))}
            {user&&(!guild||guild.player!==user.id)&&<Link className="button" href="/guild/create">Create Guild</Link>}
            {user&&<div className="switchcontainer">
                <p>Looking for Guilds</p>
                <label className="switch">
                    <input type="checkbox" checked={lfg} onChange={handleLfgToggle}/>
                    <span className="slider round"></span>
                </label>
            </div>}
			{user&&guilds&&guilds.length&&<Link className="button" href="/guild/browse/member">Your Guilds</Link>}
            <HomeLink/>
        </div>
    );
}