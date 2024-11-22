"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { HomeLink } from "@/app/commons";
import { useGlobalContext } from "@/app/Context/store";

export default function GuildSettings () {
    const { authenticated, user } = useGlobalContext();
    const [guild, setGuild] = useState<any>(null);
    const [display, setDisplay] = useState<string>("");
    const [displayChange, toggleDisplayChange] = useState<boolean>(false);
    const [guildMainMembers, setGuildMainMembers] = useState<any[]>([]);
    const [guildMembers, setGuildMembers] = useState<any[]>([]);
    const [lfp, setLfp] = useState<boolean>(false);
    
    document.title = `Guild Settings - Daimon`;

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
                    if(guild.data) {
                        axios({
                            method: "get",
                            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild/"+guild.data+"/mainmembers",
                            withCredentials: true
                        })
                            .then(members => {
                                setGuildMainMembers(members.data);
                            })
                        axios({
                            method: "get",
                            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild/"+guild.data+"/members",
                            withCredentials: true
                        })
                            .then(members => {
                                setGuildMembers(members.data);
                            })
                    }
                })
            axios({
                method: "get",
                url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild",
                withCredentials: true
            })
                .then(guild => {
                    setGuild(guild.data);
                    setLfp(guild.data.lfp);
                    setDisplay(guild.data.display);
                })
        }
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

    const handleChangeDisplay = () => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild/display",
            withCredentials: true,
            data: {display: display}
        })
            .then(() => {
                toggleDisplayChange(false);
            })
    }

    const handleGuildDelete = () => {
        axios({
            method: "delete",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild",
            withCredentials: true
        })
            .then(() => {
                location.href = "/guild/browse";
            })
    }

    const handleMemberPromote = (member:any) => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild/member/promote",
            withCredentials: true,
            data: {id: member.id}
        })
            .then(() => {
                location.href = "/guild/browse";
            })
    }

    const handleMemberKick = (member:any) => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild/member/kick",
            withCredentials: true,
            data: {id: member.id}
        })
            .then(() => {
                location.reload();
            })
    }

    return (
        <div>
            <h1>Guild Settings</h1>
            {guild&&<div className="card">
                <p>Display Name</p>
                {!displayChange&&<>
                    <p className="text">{guild.display}</p>
                    <button onClick={() => toggleDisplayChange(true)}>Edit</button>
                </>}
                {displayChange&&<>
                    <input type="text" value={display} onChange={e => setDisplay(e.target.value)} />
                    <button onClick={handleChangeDisplay}>Save</button>
                    <button onClick={() => toggleDisplayChange(false)}>Cancel</button>
                </>}
            </div>}
            <div className="card">
                <p>Main Members</p>
                {guildMainMembers&&guildMainMembers.map((member:any) => (<>
                    <Link href={"/player/"+member.id} key={member.id}><p className="text">{member.display}</p></Link>
                    <button onClick={() => handleMemberPromote(member)}>Transfer Guild Ownership</button>
                    <button onClick={() => handleMemberKick(member)}>Kick</button>
                </>))}
            </div>
            <div className="card">
                <p>Members</p>
                {guildMembers&&guildMembers.map((member:any) => (<>
                    <Link href={"/player/"+member.id} key={member.id}><p className="text">{member.display}</p></Link>
                    <button onClick={() => handleMemberKick(member)}>Kick</button>
                </>))}
            </div>
            <button className="button" onClick={handleGuildDelete}>Delete Guild</button>
            <Link className="button" href="/guild/recruit">Recruit</Link>
            <Link className="button" href="/inbox">Inbox</Link>
            {user&&<div className="switchcontainer">
                <p>Looking for Players</p>
                <label className="switch">
                    <input type="checkbox" checked={lfp} onChange={handleLfpToggle}/>
                    <span className="slider round"></span>
                </label>
            </div>}
            <HomeLink/>
        </div>
    );
}