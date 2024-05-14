"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { HomeLink, scoreToLevel } from "@/app/commons";

export const GuildBrowse= () => {
    const [user, setUser] = useState<any>(null);
    const [mainGuild, setMainGuild] = useState<any>(null);
    const [guilds, setGuilds] = useState<any[]>([]);
    const [lfg, setLfg] = useState<boolean>(false);
    const [allGuilds, setAllGuilds] = useState<any[]>([]);
    const [messages, setMessages] = useState<any[]>([]);

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
                setLfg(user.data.lfg);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/messages",
            withCredentials: true
        })
            .then(messages => {
                setMessages(messages.data.filter((message:any) => message.type===0));
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild",
            withCredentials: true
        })
            .then(guild => {
                setMainGuild(guild.data);
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

    const handleRequestJoin = (id: string) => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/message",
            withCredentials: true,
            data: {
                type: 1,
                target: id
            }
        })
        .then(() => {
            location.reload();
        })
    }

    const handleLeave = (id: string) => {
        axios({
            method: "delete",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guilds/"+id,
            withCredentials: true
        })
        .then(() => {
            location.reload();
        })
    }

    const handleSetMainGuild = (id:string) => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild",
            data: {
                id: id
            },
            withCredentials: true
        })
            .then(() => {
                location.reload();
            });
    }

    const canGuildBeJoined = (guild: any) => {
        if(!guild.lfp&&!messages.find(m => m.guild===guild.id)) {
            return false;
        }
        if(guilds.find(g => g.id===guild.id)) {
            return false;
        }
        return true;
    }

    return (
        <div>
            <h1>Guilds</h1>
            {allGuilds && allGuilds.map((guild:any) => (
                <div key={guild.score} className="card">
                    <Link href={"/guild/"+guild.id}><p>{guild.display}</p></Link>
                    <p className="text">Level: {scoreToLevel(guild.score)}</p>
                    <p className="text">Score: {guild.score}</p>
                    {canGuildBeJoined(guild)&&<button onClick={() => handleRequestJoin(guild.id)}>Request to Join</button>}
                    {user&&guilds.find(g => g.id===guild.id)&&mainGuild&&mainGuild.player!==user.id&&mainGuild.id!==guild.id&&<button onClick={() => handleSetMainGuild(guild.id)}>Set Main</button>}
                    {guilds&&guilds.find(g => g.id===guild.id)&&mainGuild&&mainGuild.id!==guild.id&&<button onClick={() => handleLeave(guild.id)}>Leave</button>}
                    {user&&mainGuild&&mainGuild.player===user.id&&mainGuild.id===guild.id&&<button><Link className="primary" href="/guild">Manage</Link></button>}
                </div>
            ))}
            {user&&(!mainGuild||mainGuild.player!==user.id)&&<Link className="button" href="/guild/create">Create Guild</Link>}
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