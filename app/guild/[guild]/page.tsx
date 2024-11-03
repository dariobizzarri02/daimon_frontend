"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { HomeLink, scoreToLevel } from "@/app/commons";
import { useGlobalContext } from "@/app/Context/store";

export default function GuildPage ({ params }: { params: { guild: string } }) {
    const { authenticated, user } = useGlobalContext();
    const [userGuild, setUserGuild] = useState<any>(null);
    const [guild, setGuild] = useState<any>(null);
    const [guildMainMembers, setGuildMainMembers] = useState<any[]>([]);
    const [guildMembers, setGuildMembers] = useState<any[]>([]);

    useEffect(() => {
        if(authenticated) {
            axios({
                method: "get",
                url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild",
                withCredentials: true
            })
                .then(guild => {
                    setUserGuild(guild.data);
                })
        }
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
    }, [authenticated]);

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
            {userGuild&&userGuild.id===params.guild&&user&&userGuild.player===user&&<Link className="button" href="/guild/manage">Manage</Link>}
            <HomeLink/>
        </div>
    );
}