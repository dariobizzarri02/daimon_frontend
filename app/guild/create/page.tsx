"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { HomeLink } from "@/app/commons";
import { useGlobalContext } from "@/app/Context/store";

export default function GuildCreate () {
    const { authenticated, user } = useGlobalContext();
    const [guildDisplay, setGuildDisplay] = useState<string>("");
    
    document.title = `Create Guild - Daimon`;

    useEffect(() => {
        if(authenticated===false) {
            location.href = "/account/login";
            return;
        }
    }, [authenticated]);
    
    const handlePost = () => {
        if(!guildDisplay) return;
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/guild",
            data: {
                display: guildDisplay,
                player: user
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