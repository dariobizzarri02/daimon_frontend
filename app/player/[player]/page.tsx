"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import HomeLink from "@/app/homelink";
import Character from "@/app/character";

export default function Player({ params }: { params: { player: string } }) {
    const [user, setUser] = useState<any>(null);
    const [userGuild, setUserGuild] = useState<any>(null);
    const [player, setPlayer] = useState<any>(null);
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
                setUserGuild(guild.data);
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
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/player/"+params.player+"/character/boolean",
            withCredentials: true
        })
            .then(character => {
                setCharacter(character.data);
            })
    }, []);

    const scoreToLevel = (score:number) => {
        return Math.floor(Math.sqrt(score/125))
    }

    const HandlePost = (player: string) => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/message",
            data: {
                type: 0,
                target: player
            },
            withCredentials: true
        })
    }

    const canUserBeInvited = () => {
        //if player is looking for a guild
        if(player&&player.lfg===1) {
            //if user is in a guild and is the leader
            if(user&&userGuild&&userGuild.player===user.id) {
                //if player is not self
                if(user.id!==player.id) {
                    //if player is not already in the guild
                    if(guilds.filter(guild => guild.id===guild.id).length===0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    return (
        <div>
            <h1>{player&&player.display}</h1>
            {character===true&&<Character id={player.id}/>}
            <div className="card">
                <p>Player</p>
                <p className="text">Level: {player&&scoreToLevel(player.score)}</p>
                <p className="text">Score: {player&&player.score}</p>
            </div>
            {guild&&<div className="card">
            <Link href={"/guild/"+guild.id}><p>Main Guild: {guild&&guild.display}</p></Link>
                <p className="text">Level: {guild&&scoreToLevel(guild.score)}</p>
                <p className="text">Score: {guild&&guild.score}</p>
            </div>}
            {guilds&&guilds.length>0&&<div className="card">
                <p>Guilds:</p>
                {guilds.map(guild => (
                    <div key={guild.id}>
                        <Link href={"/guild/"+guild.id}>
                            <p className="text">{guild.display}</p>
                        </Link>
                    </div>
                ))}
            </div>}
            {auths&&auths.local&&auths.local.username&&<div className="card">
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
            {user&&player&&user.id===player.id&&<Link className="button" href="/account"><button>Manage</button></Link>}
            {canUserBeInvited()&&<button className="button" onClick={() => HandlePost(player.id)}>Invite</button>}
            <HomeLink/>
        </div>
    );
}