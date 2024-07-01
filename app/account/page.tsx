"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { HomeLink, Character, scoreToLevel } from "@/app/commons";

export default function Account () {
    const [user, setUser] = useState<any>(null);
    const [auths, setAuths] = useState<any>(null);
    const [guild, setGuild] = useState<any>(null);
    const [guilds, setGuilds] = useState<any[]>([]);
    const [character, setCharacter] = useState<boolean|null>(null);

    useEffect(() => {
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user",
            withCredentials: true
        })
            .then(user => {
                if(!user.data) {
                    location.href = "/account/login";
                    return;
                }
                if(user.data&&!user.data.display) {
                    location.href = "/account/create";
                    return;
                }
                setUser(user.data);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth",
            withCredentials: true
        })
            .then(auths => {
                setAuths(auths.data);
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
            .then(response => {
                setGuilds(response.data);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/character/boolean",
            withCredentials: true
        })
            .then(response => {
                setCharacter(response.data);
            })
    }, []);

    const handleLogout = () => {
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth/logout",
            withCredentials: true
        })
            .then(() => {
                location.href = "/";
            });
    };

    return (
        <div>
            <h1>Account</h1>
            {user&&user.id&&character===true&&<Character id={user.id}/>}
            {user&&user.display&&<div className="card">
                <Link href={"/player/"+user.id}><p>Display Name: {user.display}</p></Link>
                <p className="text">Total Level: {scoreToLevel(user.score)}</p>
                <p className="text">Total Score: {user.score}</p>
            </div>}
            {guild&&<div className="card">
                <Link href={"/guild/"+guild.id}><p>Main Guild: {guild.display}</p></Link>
                <p className="text">Level: {scoreToLevel(guild.score)}</p>
                <p className="text">Score: {guild.score}</p>
            </div>}
            {guilds&&<div className="card">
                <p>Guilds:</p>
                {guilds.map((guild:any) => {
                    return <div key={guild.id}>
                        <Link href={"/guild/"+guild.id}><p className="text">{guild.display}</p></Link>
                    </div>
                })}
            </div>}
            {auths&&auths.local&&<div className="card">
                <p>Username: @{auths.local.username}</p>
            </div>}
            {auths&&auths.discord&&<div className="card inlineblock">
                <div>
                    <img src="/discord.png" alt="Discord"/>
                    <Link href="https://discord.com/channels/@me" target="_blank" rel="noreferrer"><p>@{auths.discord.discord_username}</p></Link>
                </div>
                <p className="text">Level: {scoreToLevel(auths.discord.score)}</p>
                <p className="text">Score: {auths.discord.score}</p>
            </div>}
            {auths&&auths.minecraft&&<div className="card inlineblock">
                <div>
                    <img src="/minecraft.png" alt="Minecraft"/>
                    <p>{auths.minecraft.minecraft_username}</p>
                </div>
                <p className="text">Level: {scoreToLevel(auths.minecraft.score)}</p>
                <p className="text">Score: {auths.minecraft.score}</p>
            </div>}
            {auths&&(!auths.local||!auths.discord||!auths.minecraft)&&
                <Link className="plus" href="/account/link"/>
            }
            {character===false&&
                <Link className="button" href="/character/create">Create Character</Link>
            }
            {character===true&&
                <Link className="button" href="/character/create">Edit Character</Link>
            }
            <Link className="button" href="/inbox">Inbox</Link>
			<button className="button" onClick={handleLogout}>Logout</button>
            <Link className="button" href="/account/settings">Settings</Link>
            <HomeLink/>
        </div>
    );
}