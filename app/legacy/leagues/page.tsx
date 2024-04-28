'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Leagues() {
    const [playerData, setPlayerData] = useState<any>(null);
    const [hideSelectedPlayers, setHideSelectedPlayers] = useState<boolean>(false);
    const [sortVerse, setSortVerse] = useState<boolean>(false);

    const teams = [
        'Demacia',
        'Freljord',
        'Noxus',
        'Shurima'
    ];

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'players'
        })
            .then(response => {
                setPlayerData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const refresh = () => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'players'
        })
            .then(response => {
                setPlayerData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const sortBy = (field: string) => {
        let sortedPlayerData = [...playerData];
        sortedPlayerData.sort((a: any, b: any) => {
            switch (field) {
                case 'team':
                    if (a.team === null) {
                        return -1;
                    } else if (b.team === null) {
                        return 1;
                    }
                    return a.team - b.team;
                case 'name':
                    if (a.display < b.display) {
                        return -1;
                    } else if (a.display > b.display) {
                        return 1;
                    }
                    return 0;
                case 'rank':
                    if (a.rank < b.rank) {
                        return -1;
                    } else if (a.rank > b.rank) {
                        return 1;
                    }
                    return 0;
                case 'role_1':
                    if (a.role_1 < b.role_1) {
                        return -1;
                    } else if (a.role_1 > b.role_1) {
                        return 1;
                    }
                    return 0;
                case 'role_2':
                    if (a.role_2 < b.role_2) {
                        return -1;
                    } else if (a.role_2 > b.role_2) {
                        return 1;
                    }
                    return 0;
                case 'role_3':
                    if (a.role_3 < b.role_3) {
                        return -1;
                    } else if (a.role_3 > b.role_3) {
                        return 1;
                    }
                    return 0;
                case 'role_4':
                    if (a.role_4 < b.role_4) {
                        return -1;
                    } else if (a.role_4 > b.role_4) {
                        return 1;
                    }
                    return 0;
                case 'role_5':
                    if (a.role_5 < b.role_5) {
                        return -1;
                    } else if (a.role_5 > b.role_5) {
                        return 1;
                    }
                    return 0;
                case 'synergies':
                    if (a.synergies < b.synergies) {
                        return -1;
                    } else if (a.synergies > b.synergies) {
                        return 1;
                    }
                    return 0;
                case 'opgg':
                    if (a.opgg < b.opgg) {
                        return -1;
                    } else if (a.opgg > b.opgg) {
                        return 1;
                    }
            }
            return 0;
        });
        if (sortVerse) {
            sortedPlayerData.reverse();
        }
        setSortVerse(!sortVerse);
        setPlayerData(sortedPlayerData);
    }

    return (
        <div>
            <div className="color-filter"/>
            <img className="bg" src="/2023_championship.png" alt="bg" />
            <h2>MASTERBASE</h2>
            <h1>ALL-STAR CHAMPIONSHIP</h1>
            <table>
                <thead>
                    <tr>
                        <th className="left"><button onClick={() => sortBy('team')}>Team</button></th>
                        <th className="left"><button onClick={() => sortBy('name')}>Name</button></th>
                        <th className="left"><button onClick={() => sortBy('rank')}>Price</button></th>
                        <th><button onClick={() => sortBy('rank')}>Rank</button></th>
                        <th><button onClick={() => sortBy('role_1')}>Role 1</button></th>
                        <th><button onClick={() => sortBy('role_2')}>Role 2</button></th>
                        <th><button onClick={() => sortBy('role_3')}>Role 3</button></th>
                        <th><button onClick={() => sortBy('role_4')}>Role 4</button></th>
                        <th><button onClick={() => sortBy('role_5')}>Role 5</button></th>
                        <th className="left"><button onClick={() => sortBy('synergies')}>Synergies</button></th>
                        <th className="left"><button onClick={() => sortBy('opgg')}>OP.GG</button></th>
                    </tr>
                </thead>
                <tbody>
                    {playerData && playerData.map((player: any) => {
                        if (hideSelectedPlayers && player.team !== null) {
                            return null;
                        }
                        return (
                            <tr key={player.id}>
                                <td>{teams[player.team]}</td>
                                <td>{player.display}</td>
                                <td>{player.rank}</td>
                                <td><img className="rank" src={'/rank_'+player.rank+'.webp'} alt={player.rank} /></td>
                                <td><img src={'/'+player.role_1+'.webp'} alt={player.role_1} /></td>
                                <td><img src={'/'+player.role_2+'.webp'} alt={player.role_2} /></td>
                                <td><img src={'/'+player.role_3+'.webp'} alt={player.role_3} /></td>
                                <td><img src={'/'+player.role_4+'.webp'} alt={player.role_4} /></td>
                                <td><img src={'/'+player.role_5+'.webp'} alt={player.role_5} /></td>
                                <td>{player.synergies}</td>
                                <td><a href={player.opgg} target="_blank" rel="noreferrer">OP.GG</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button className="hide" onClick={() => setHideSelectedPlayers(!hideSelectedPlayers)}>{hideSelectedPlayers ? 'Show' : 'Hide'} Selected Players</button>
            <button className="refresh" onClick={() => refresh()}>Refresh</button>
        </div>
    );
}