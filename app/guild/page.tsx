"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { HomeLink, scoreToLevel } from "@/app/commons";
import { useGlobalContext } from "@/app/Context/store";

export default function Guild () {
    const { authenticated, user } = useGlobalContext();
    const [guild, setGuild] = useState<any>(null);
    const [guildMainMembers, setGuildMainMembers] = useState<any[]>([]);
    const [guildMembers, setGuildMembers] = useState<any[]>([]);
    const [lfp, setLfp] = useState<boolean>(false);

    useEffect(() => {
        if(authenticated) {
            axios({
                method: "get",
                url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild",
                withCredentials: true
            })
                .then(guild => {
                    setGuild(guild.data);
                    setLfp(guild.data.lfp);
                })
        }
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild/"+guild.data.id+"/mainmembers",
            withCredentials: true
        })
            .then(members => {
                setGuildMainMembers(members.data);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild/"+guild.data.id+"/members",
            withCredentials: true
        })
            .then(members => {
                setGuildMembers(members.data);
            })
    }, [authenticated]);

    const handleLfpToggle = () => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild/lfp",
            withCredentials: true
        })
            .then(() => {
                setLfp(!lfp);
            })
    }

    return (
        <div>
            <h1>{guild&&guild.display}</h1>
            <div className="card">
                <p>Guild</p>
                <p className="text">Level: {guild&&scoreToLevel(guild.score)}</p>
                <p className="text">Score: {guild&&guild.score}</p>
            </div>
            <div className="card">
                <p>Main Members</p>
                {guildMainMembers&&guildMainMembers.map((member:any) => (
                    <Link href={"/player/"+member.id} key={member.id}><p className="text">{member.display}</p></Link>
                ))}
            </div>
            <div className="card">
                <p>Members</p>
                {guildMembers&&guildMembers.map((member:any) => (
                    <Link href={"/player/"+member.id} key={member.id}><p className="text">{member.display}</p></Link>
                ))}
            </div>
            <Link className="button" href="/guild/recruit">Recruit</Link>
            <Link className="button" href="/inbox">Inbox</Link>
            {user&&<div className="switchcontainer">
                <p>Looking for Players</p>
                <label className="switch">
                    <input type="checkbox" checked={lfp} onChange={handleLfpToggle}/>
                    <span className="slider round"></span>
                </label>
            </div>}
            <Link className="button" href="/guild/settings">Settings</Link>
            <HomeLink/>
        </div>
    );
}