'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

declare interface cosmetic {
    id: string;
    display: string;
}

export default function CharacterCreation() {
    const [hairStyles, setHairStyles] = useState<cosmetic[]>([]);
    const [characterDisplay, setCharacterDisplay] = useState('');
    const [characterMuscle, setCharacterMuscle] = useState(0);
    const [characterFat, setCharacterFat] = useState(0);
    const [characterHeight, setCharacterHeight] = useState(0);
    const [characterEyeColor, setCharacterEyeColor] = useState('#000000');
    const [characterHairColor, setCharacterHairColor] = useState('#000000');
    const [characterHairStyle, setCharacterHairStyle] = useState('');

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.API_ENDPOINT+'cancreatecharacter',
        })
            .then(response => {
                console.log(response.data);
                if(!response.data) location.href = '/characters';
            })
            .catch(error => {
                console.error(error);
            });
        axios({
            method: 'get',
            url: process.env.API_ENDPOINT+'cosmetic/hair'
        })
            .then(response => {
                setHairStyles(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const HandlePost = () => {
        if(!characterDisplay || !characterEyeColor || !characterHairColor || !characterHairStyle) return;
        const bodyData = {
            muscle: characterMuscle,
            fat: characterFat,
            height: characterHeight,
            eyeColor: characterEyeColor,
            hairColor: characterHairColor,
            hairStyle: characterHairStyle
        };
        axios({
            method: 'post',
            url: process.env.API_ENDPOINT+'character',
            data: {
                display: characterDisplay,
                body: JSON.stringify(bodyData)
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
            <h1>Create a new Character</h1>
            <input type="text" placeholder="Display Name" value={characterDisplay} onChange={e => setCharacterDisplay(e.target.value)} />
            <input type="range" min="0" max="100" value={characterMuscle} onChange={e => setCharacterMuscle(parseFloat(e.target.value))} />
            <input type="range" min="0" max="100" value={characterFat} onChange={e => setCharacterFat(parseFloat(e.target.value))} />
            <input type="range" min="0" max="100" value={characterHeight} onChange={e => setCharacterHeight(parseFloat(e.target.value))} />
            <input type="color" value={characterEyeColor} onChange={e => setCharacterEyeColor(e.target.value)} />
            <input type="color" value={characterHairColor} onChange={e => setCharacterHairColor(e.target.value)} />
            <select value={characterHairStyle} onChange={e => setCharacterHairStyle(e.target.value)}>
                <option value="">Select Hair Style</option>
                {hairStyles.map(hairStyle => (
                    <option key={hairStyle.id} value={hairStyle.id}>{hairStyle.display}</option>
                ))}
            </select>
            <button onClick={HandlePost}>[ Create Character ]</button>
            <Link href="/">[ Home ]</Link>
        </div>
    );
}