"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { HomeLink } from "@/app/commons";

export default function GuildCreate () {
    const [user, setUser] = useState<any>(null);
    const [guildDisplay, setGuildDisplay] = useState<string>("");

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
            });
    }, []);
    
    const handlePost = () => {
        if(!guildDisplay) return;
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild",
            data: {
                display: guildDisplay,
                player: user.id
            },
            withCredentials: true
        })
            .then(() => {
                location.href = "/guild/browse";
            })
    };

    return (
        <div>
            <h1>Create Guild</h1>
            <div className="formtab">
                <input className="form" type="text" placeholder="Display Name" onChange={(e) => setGuildDisplay(e.target.value)} />
                <button className="form" onClick={handlePost}>Create</button>
            </div>
            <HomeLink/>
        </div>
    );
}