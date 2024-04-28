'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Music() {
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:3000');

        socket.onopen = () => {
            console.log('WebSocket connection opened');
            setSocket(socket);
        };

        socket.onmessage = (event) => {
            console.log('Received message:', event.data);
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        }

        socket.onclose = () => {
            console.log('WebSocket connection closed');
            setSocket(null);
        }

        return () => {
            console.log('WebSocket connection closed');
            socket.close();
            setSocket(null);
        };
    }, []);

    const handlePing = () => {
        if (socket) {
            socket.send('ping');
        }
    }

    return (
        <div>
            <button onClick={handlePing}>Ping</button>
            <Link className='button' href="/">Home</Link>
        </div>
    );
}