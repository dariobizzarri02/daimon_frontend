'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeLink from '../homelink';

export default function Mail() {
    const [ messages, setMessages ] = useState<any[]>([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: process.env.NEXT_PUBLIC_API_ENDPOINT+'user/messages',
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
                        <p>{'Invite to Guild | The player ' + message.player + ' is invited to join the guild ' + message.guild + '.'}</p>
                    </div>
                );
            })}
            <HomeLink />
        </div>
    );
}