"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { HomeLink, scoreToLevel } from "@/app/commons";
import Link from "next/link";

export default function Leaderboard () {
    const [leaderboard, toggleLeaderboard] = useState<string>("");
    const [pages, setPages] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [entries, setEntries] = useState<any[]>([]);

    document.title = `Leaderboard - Daimon`;

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const leaderboard = urlParams.get("leaderboard");
        if(leaderboard&&["players","guilds","minecraft","minecraft_factions","discord"].includes(leaderboard)) {
            toggleLeaderboard(leaderboard);
        }
        else {
            toggleLeaderboard("players");
        }
        refresh();
    }, []);

    useEffect(() => {
        refresh();
    }, [page, leaderboard]);

    const refresh = () => {
        if(!leaderboard) return;
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/leaderboard/"+leaderboard,
            withCredentials: true
        })
            .then(response => {
                setPages(response.data);
            })
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/leaderboard/"+leaderboard+"/"+page,
            withCredentials: true
        })
            .then(response => {
                setEntries(response.data);
            })
    }
    
    return (
        <div>
            <h1>Leaderboard</h1>
            <div className="pages">{
                Array.from(Array(pages).keys()).map((index) => {
                    return <p key={index} className={page===index?"active":""} onClick={() => setPage(index)}>{index+1}</p>
                })
                }</div>
            <div className="tab">
                <button className={leaderboard==="players"?"active":""} onClick={() => toggleLeaderboard("players")}>Players</button>
                <button className={leaderboard==="guilds"?"active":""} onClick={() => toggleLeaderboard("guilds")}>Guilds</button>
                <button className={leaderboard==="minecraft"?"active":""} onClick={() => toggleLeaderboard("minecraft")}>Minecraft</button>
                <button className={leaderboard==="minecraft_factions"?"active":""} onClick={() => toggleLeaderboard("minecraft_factions")}>Minecraft Factions</button>
                <button className={leaderboard==="discord"?"active":""} onClick={() => toggleLeaderboard("discord")}>Discord</button>
            </div>
            {leaderboard==="players"&&<>
            <table>
                <thead>
                    <tr>
                        <th className="fit"></th>
                        <th>Name</th>
                        <th>Guild</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {entries && entries.sort((a: any, b: any) => b.score - a.score).map((player: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td><Link href={"/player/"+player.id}>{player.display}</Link></td>
                                <td><Link href={"/guild/"+player.guild}>{player.guild_display}</Link></td>
                                <td>{scoreToLevel(player.score)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </>}
            {leaderboard==="guilds"&&<>
            <table>
                <thead>
                    <tr>
                        <th className="fit"></th>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {entries && entries.sort((a: any, b: any) => b.score - a.score).map((guild: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td><Link href={"/guild/"+guild.id}>{guild.display}</Link></td>
                                <td><Link href={"/player/"+guild.player}>{guild.player_display}</Link></td>
                                <td>{scoreToLevel(guild.score)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </>}
            {leaderboard==="minecraft"&&<>
            <table>
                <thead>
                    <tr>
                        <th className="fit"></th>
                        <th>Name</th>
                        <th>Player Name</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {entries && entries.sort((a: any, b: any) => b.score - a.score).map((minecraft: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td><Link href={"/player/"+minecraft.player}>{minecraft.player_display}</Link></td>
                                <td>{minecraft.minecraft_username}</td>
                                <td>{scoreToLevel(minecraft.score)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </>}
            {leaderboard==="minecraft_factions"&&<>
            <table>
                <thead>
                    <tr>
                        <th className="fit"></th>
                        <th>Name</th>
                        <th>Faction Name</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {entries && entries.sort((a: any, b: any) => b.score - a.score).map((minecraftFactions: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td><Link href={"/guild/"+minecraftFactions.guild}>{minecraftFactions.guild_display}</Link></td>
                                <td>{minecraftFactions.name}</td>
                                <td>{scoreToLevel(minecraftFactions.score)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </>}
            {leaderboard==="discord"&&<>
            <table>
                <thead>
                    <tr>
                        <th className="fit"></th>
                        <th>Name</th>
                        <th>Discord Username</th>
                        <th>Level</th>
                    </tr>
                </thead>
                <tbody>
                    {entries && entries.sort((a: any, b: any) => b.score - a.score).map((discord: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td><Link href={"/player/"+discord.player}>{discord.player_display}</Link></td>
                                <td>{discord.discord_username}</td>
                                <td>{scoreToLevel(discord.score)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </>}
            <button className="button" onClick={refresh}>Refresh</button>
            <HomeLink/>
        </div>
    );
}