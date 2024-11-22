"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { HomeLink, scoreToLevel } from "@/app/commons";
import { useGlobalContext } from "@/app/Context/store";

export default function GuildBrowseMember () {
	const { authenticated, user } = useGlobalContext();
    const [mainGuild, setGuild] = useState<any>(null);
    const [guilds, setGuilds] = useState<any[]>([]);
    
    document.title = `Your Guilds - Daimon`;

    useEffect(() => {
        if(authenticated===false) {
            location.href = "/account/login";
            return;
        }
        if(authenticated) {
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
        }
    }, [authenticated]);

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

    return (
        <div>
            <h1>Guilds</h1>
            {mainGuild&&<div className="card">
                <Link href={"/guild/"+mainGuild.id}><p>(Main Guild) {mainGuild.display}</p></Link>
                <p className="text">Level: {scoreToLevel(mainGuild.score)}</p>
                <p className="text">Score: {mainGuild.score}</p>
                {user&&mainGuild&&mainGuild.player===user&&<button><Link className="primary" href="/guild">Manage</Link></button>}
            </div>}
            {guilds && guilds.map((guild:any) => (
                <div key={guild.score} className="card">
                    <Link href={"/guild/"+guild.id}><p className="text">{guild.display}</p></Link>
                    <p className="text">Level: {scoreToLevel(guild.score)}</p>
                    <p className="text">Score: {guild.score}</p>
                    {user&&mainGuild&&mainGuild.player!==user&&mainGuild.id!==guild.id&&<button onClick={() => handleSetMainGuild(guild.id)}>Set Main</button>}
                    {guilds&&guilds.find(g => g.id===guild.id)&&mainGuild&&mainGuild.id!==guild.id&&<button onClick={() => handleLeave(guild.id)}>Leave</button>}
                </div>
            ))}
            {user&&(!mainGuild||mainGuild.player!==user)&&<Link className="button" href="/guild/create">Create Guild</Link>}
			<Link className="button" href="/guild/browse">Browse Guilds</Link>
            <HomeLink/>
        </div>
    );
}