"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import HomeLink from "../../homelink";
import Link from "next/link";

export default function GuildRecruit() {
    const [ user, setUser ] = useState<any>(null);
    const [players, setPlayers] = useState<any[]>([]);

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
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/players",
            withCredentials: true
        })
            .then(players => {
                setPlayers(players.data);
            })
    }, []);

    const HandlePost = (player: string) => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/message",
            data: {
                type: 0,
                target: player
            },
            withCredentials: true
        })
    }

    const scoreToLevel = (score:number) => {
        return Math.floor(Math.sqrt(score/125))
    }

    return (
        <div>
            <h1>Recruit</h1>
            <h2>Players</h2>
            {players.filter(player => player.lfg).filter(player => player.id !== user.id).sort((a, b) => b.score - a.score).map(player => {
                    return (
                        <div className="card">
                            <p>{player.display}</p>
                            <p className="text">Level: {scoreToLevel(player.score)}</p>
                            <p className="text">Score: {player.score}</p>
                            <button onClick={() => HandlePost(player.id)}>Invite</button>
                        </div>
                    )
                })
            }
            <Link className="button" href="/inbox">Inbox</Link>
            <HomeLink/>
        </div>
    );
}
