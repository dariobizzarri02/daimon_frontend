'use client'

import { useState, useEffect } from 'react';
import { useGlobalContext } from '../Context/store';
import axios from 'axios';
import Link from 'next/link';

declare interface Character {
    id: string;
    display: string;
}

export default function Characters() {
    const [characters, setCharacters] = useState<Character[]>([]);
    const [canCreateCharacter, setCanCreateCharacter] = useState<boolean>(false);
    const { setCharacter } = useGlobalContext();
    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'characters',
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                setCharacters(response.data);
            })
            .catch(error => {
                console.error(error);
            });
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'cancreatecharacter',
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                setCanCreateCharacter(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Characters</h1>
            <select onChange={e => setCharacter(e.target.value)}>
                <option value="">Select a Character</option>
                {characters.map(character => (
                    <option key={character.id} value={character.id}>{character.display}</option>
                ))}
            </select>
            {canCreateCharacter && <Link href="/charactercreation">[ Create Character ]</Link>}
            <Link href="/guild">[ Guild ]</Link>
            <Link href="/">[ Home ]</Link>
        </div>
    );
}