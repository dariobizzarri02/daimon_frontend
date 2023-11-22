'use client'

import { useState, useEffect } from 'react';
import { useGlobalContext } from '../Context/store';
import axios from 'axios';
import Link from 'next/link';

export default function Mail() {
    const { character } = useGlobalContext();
    const [ messages, setMessages ] = useState<any[]>([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.API_ENDPOINT+'mail',
            withCredentials: true
        })
            .then(response => {
                console.log(response.data);
                setMessages(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>Mail</h1>
            {messages.map((message, index) => {
                return (
                    <div key={index}>
                        <p>{'Invite to Guild | The character ' + message.character + ' is invited to join the guild ' + message.guild + '.'}</p>
                    </div>
                );
            })}
            <Link href="/">[ Home ]</Link>
        </div>
    );
}