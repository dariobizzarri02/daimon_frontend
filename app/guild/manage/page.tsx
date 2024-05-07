"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import HomeLink from "@/app/homelink";

export default function GuildManage() {
    const [user, setUser] = useState<any>(null);
    const [guild, setGuild] = useState<any>(null);
    const [guildMainMembers, setGuildMainMembers] = useState<any[]>([]);
    const [guildMembers, setGuildMembers] = useState<any[]>([]);

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
                axios({
                    method: "get",
                    url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild/"+user.data.guild+"/mainmembers",
                    withCredentials: true
                })
                    .then(members => {
                        setGuildMainMembers(members.data);
                    })
                axios({
                    method: "get",
                    url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild/"+user.data.guild+"/members",
                    withCredentials: true
                })
                    .then(members => {
                        setGuildMembers(members.data);
                    })
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild",
            withCredentials: true
        })
            .then(guild => {
                setGuild(guild.data);
            })
    }, []);

    const scoreToLevel = (score:number) => {
        return Math.floor(Math.sqrt(score/125))
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
            <HomeLink/>
        </div>
    );
}