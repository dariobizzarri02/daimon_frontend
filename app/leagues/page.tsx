'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Account() {
    const [playerData, setPlayerData] = useState<any>(null);
    const [hideSelectedPlayers, setHideSelectedPlayers] = useState<boolean>(false);

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
                console.log(response.data);
                setPlayerData(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

//return a table of players

    return (
        <div>
            <h1>MasterBase All-Star Championship</h1>
            <h2>Player List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Name</th>
                        <th>Rank</th>
                        <th>Role 1</th>
                        <th>Role 2</th>
                        <th>Role 3</th>
                        <th>Role 4</th>
                        <th>Role 5</th>
                        <th>Synergies</th>
                        <th>OP.GG</th>
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
                                <td><img src={"/rank_"+player.rank+".webp"} /></td>
                                <td><img src={"/"+player.role_1+".webp"} /></td>
                                <td><img src={"/"+player.role_2+".webp"} /></td>
                                <td><img src={"/"+player.role_3+".webp"} /></td>
                                <td><img src={"/"+player.role_4+".webp"} /></td>
                                <td><img src={"/"+player.role_5+".webp"} /></td>
                                <td>{player.synergies}</td>
                                <td><a href={player.opgg} target='_blank'>{player.opgg}</a></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <button onClick={() => setHideSelectedPlayers(!hideSelectedPlayers)}>{hideSelectedPlayers ? 'Show' : 'Hide'} Selected Players</button>
        </div>
    );
}