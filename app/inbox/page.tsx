"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import HomeLink from "../homelink";

export default function Inbox() {
    const [ messages, setMessages ] = useState<any[]>([]);

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
            });
        Promise.all([
            axios({
                method: "get",
                url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/messages",
                withCredentials: true
            }),
            axios({
                method: "get",
                url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/guild/messages",
                withCredentials: true
            })
        ])
            .then(([messages, guildMessages]) => {
                setMessages(messages.data.concat(guildMessages.data));
            })
    }, []);

    return (
        <div>
            <h1>Inbox</h1>
            {messages.map((message, index) => {
                return (
                    <div key={index} className="card">
                        {message.type===0&&<><h2>Guild Invitation</h2>
                        <p>The player {message.player_display} has been invited to join the guild {message.guild_display}.</p>
                        </>}
                        {message.type===1&&<><h2>Guild Application</h2>
                        <p>The player {message.player_display} has applied to join the guild {message.guild_display}.</p>
                        </>}
                    </div>
                );
            })}
            <HomeLink/>
        </div>
    );
}