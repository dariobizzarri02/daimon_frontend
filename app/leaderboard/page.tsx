'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeLink from '../homelink';

export default function Leaderboard() {
    const [leaderboard, toggleLeaderboard] = useState("");
    const [pages, setPages] = useState(0);
    const [page, setPage] = useState(0);
    const [players, setPlayers] = useState<any>(null);
    const [guilds, setGuilds] = useState<any>(null);
    const [minecraft, setMinecraft] = useState<any>(null);
    const [minecraftFactions, setMinecraftFactions] = useState<any>(null);
    const [discord, setDiscord] = useState<any>(null);

    function xpToLevel(xp:any){
        return Math.floor(Math.sqrt(xp/125))
    }

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const leaderboard = urlParams.get('leaderboard');
        if (leaderboard&&['players','guilds','minecraft','minecraft_factions','discord'].includes(leaderboard)) {
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
        //get /leaderboard/:leaderboard to find out how many pages there are
        if(!leaderboard) return;
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'leaderboard/'+leaderboard,
            withCredentials: true
        })
            .then(response => {
                setPages(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'leaderboard/'+leaderboard+"/"+page,
            withCredentials: true
        })
            .then(response => {
                if (leaderboard==="players") {
                    setPlayers(response.data);
                }
                else if (leaderboard==="guilds") {
                    setGuilds(response.data);
                }
                else if (leaderboard==="minecraft") {
                    setMinecraft(response.data);
                }
                else if (leaderboard==="minecraft_factions") {
                    setMinecraftFactions(response.data);
                }
                else if (leaderboard==="discord") {
                    setDiscord(response.data);
                }
            })
    }
    
    return (
        <div>
            <h1>Leaderboard</h1>
            <div className='pages'>{
                // Show page numbers (like this: 1 2 3 4 5 6 7 8 9 10), just the text, no links
                Array.from(Array(pages).keys()).map((index) => {
                    return <p key={index} className={page===index?"active":""} onClick={() => setPage(index)}>{index+1}</p>
                })
                }</div>
            <div className='tab'>
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
                    {players && players.sort((a: any, b: any) => b.score - a.score).map((player: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{player.display}</td>
                                <td>{player.guild_display}</td>
                                <td>{xpToLevel(player.score)}</td>
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
                    {guilds && guilds.sort((a: any, b: any) => b.score - a.score).map((guild: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{guild.display}</td>
                                <td>{guild.player_display}</td>
                                <td>{xpToLevel(guild.score)}</td>
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
                    {minecraft && minecraft.sort((a: any, b: any) => b.score - a.score).map((minecraft: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{minecraft.player_display}</td>
                                <td>{minecraft.minecraft_username}</td>
                                <td>{xpToLevel(minecraft.score)}</td>
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
                    {minecraftFactions && minecraftFactions.sort((a: any, b: any) => b.score - a.score).map((minecraftFactions: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{minecraftFactions.guild_display}</td>
                                <td>{minecraftFactions.name}</td>
                                <td>{xpToLevel(minecraftFactions.score)}</td>
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
                    {discord && discord.sort((a: any, b: any) => b.score - a.score).map((discord: any, index: number) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{discord.player_display}</td>
                                <td>{discord.discord_username}</td>
                                <td>{xpToLevel(discord.score)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            </>}
            <button className='button' onClick={refresh}>Refresh</button>
            <HomeLink />
        </div>
    );
}