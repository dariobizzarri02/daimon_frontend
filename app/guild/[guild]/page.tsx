"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import HomeLink from "@/app/homelink";

export default function GuildGuild({ params }: { params: { guild: string } }) {
    const [user, setUser] = useState<any>(null);
    const [userGuild, setUserGuild] = useState<any>(null);
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
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild",
            withCredentials: true
        })
            .then(guild => {
                console.log(guild.data)
                console.log(user)
                console.log(params.guild)
                setUserGuild(guild.data);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild/"+params.guild,
            withCredentials: true
        })
            .then(guild => {
                setGuild(guild.data);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild/"+params.guild+"/mainmembers",
            withCredentials: true
        })
            .then(members => {
                console.log(members.data)
                setGuildMainMembers(members.data);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild/"+params.guild+"/members",
            withCredentials: true
        })
            .then(members => {
                setGuildMembers(members.data);
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
            {userGuild&&userGuild.id===params.guild&&user&&userGuild.player===user.id&&<Link className="button" href="/guild/manage">Manage</Link>}
            <HomeLink/>
        </div>
    );
}