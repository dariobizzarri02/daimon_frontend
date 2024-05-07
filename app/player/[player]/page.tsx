"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import HomeLink from "@/app/homelink";

export default function Player({ params }: { params: { player: string } }) {
    const [user, setUser] = useState<any>(null);
    const [player, setPlayer] = useState<any>(null);
    const [auths, setAuths] = useState<any>(null);
    const [guild, setGuild] = useState<any>(null);
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
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/player/"+params.player,
            withCredentials: true
        })
            .then(player => {
                setPlayer(player.data);
                setAuths({local: {username: player.data.username}, discord: player.data.discord, minecraft: player.data.minecraft});
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/player/"+params.player+"/guild",
            withCredentials: true
        })
            .then(guild => {
                setGuild(guild.data);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/player/"+params.player+"/guilds",
            withCredentials: true
        })
            .then(guilds => {
                setGuilds(guilds.data);
            })
    }, []);

    const scoreToLevel = (score:number) => {
        return Math.floor(Math.sqrt(score/125))
    }

    return (
        <div>
            <h1>{player&&player.display}</h1>
            <div className="card">
                <p>Player</p>
                <p className="text">Level: {player&&scoreToLevel(player.score)}</p>
                <p className="text">Score: {player&&player.score}</p>
            </div>
            <div className="card">
            {guild&&<Link href={"/guild/"+guild.id}><p>Main Guild: {guild&&guild.display}</p></Link>}
                <p className="text">Level: {guild&&scoreToLevel(guild.score)}</p>
                <p className="text">Score: {guild&&guild.score}</p>
            </div>
            <div className="card">
                <p>Guilds:</p>
                {guilds.map(guild => (
                    <div key={guild.id}>
                        <Link href={"/guild/"+guild.id}>
                            <p className="text">{guild.display}</p>
                        </Link>
                    </div>
                ))}
            </div>
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
            {user&&user.id===player.id&&<Link className="button" href="/account"><button>Manage</button></Link>}
            <HomeLink/>
        </div>
    );
}