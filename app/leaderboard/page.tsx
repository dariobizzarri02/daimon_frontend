'use client'

import { useState } from 'react';
import Link from 'next/link';

export default function Leaderboard() {
    const [leaderboard, toggleLeaderboard] = useState(false);
    
    return (
        // this page will have two tabs, the player leaderboard and the guild leaderboard
        <div>
            <h1>Leaderboard</h1>
            <button className='form' onClick={() => toggleLeaderboard(false)}>Player Leaderboard</button>
            <button className='form' onClick={() => toggleLeaderboard(true)}>Guild Leaderboard</button>
            {!leaderboard&&<h2>Player Leaderboard</h2>}
            {leaderboard&&<h2>Guild Leaderboard</h2>}
			<Link className='button' href="/">Home</Link>
        </div>
    );
}