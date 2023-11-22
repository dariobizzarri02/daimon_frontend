'use client'

import { useState, useEffect, use } from 'react';
import { useGlobalContext } from '../Context/store';
import axios from 'axios';
import Link from 'next/link';

export default function Invite() {
    const { character } = useGlobalContext();
    const [ guild, setGuild ] = useState<string>('');
    const [ targetCharacter, setTargetCharacter ] = useState<string>('');

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:3000/character/'+character,
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                setGuild(response.data.guild);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const HandlePost = () => {
        axios({
            method: 'post',
            url: 'http://localhost:3000/invite',
            data: {
                character: character,
                guild: guild,
                targetCharacter: targetCharacter
            },
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <h1>Invite</h1>
            <input type="text" placeholder="Target Character" onChange={e => setTargetCharacter(e.target.value)} />
            <button onClick={HandlePost}>[ Invite ]</button>
            <Link href="/">[ Home ]</Link>
        </div>
    );
}
