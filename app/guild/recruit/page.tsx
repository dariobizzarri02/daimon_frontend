"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { HomeLink, scoreToLevel } from "@/app/commons";
import Link from "next/link";
import { useGlobalContext } from "@/app/Context/store";

export default function GuildRecruit () {
    const { authenticated, user } = useGlobalContext();
    const [players, setPlayers] = useState<any[]>([]);
    
    document.title = `Guild Recruit - Daimon`;

    useEffect(() => {
        if(authenticated===false) {
            location.href = "/account/login";
            return;
        }
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

    return (
        <div>
            <h1>Recruit</h1>
            <h2>Players</h2>
            {players.filter(player => player.lfg).filter(player => player.id !== user).sort((a, b) => b.score - a.score).map(player => {
                    return (
                        <div key={player.id} className="card">
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
