'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Guild() {

    return (
        <div>
            <h1>Guilds</h1>
            <Link href="/guildcreation">[ Guild Creation ]</Link>
            <Link href="/invite">[ Invite ]</Link>
            <Link href="/">[ Home ]</Link>
        </div>
    );
}