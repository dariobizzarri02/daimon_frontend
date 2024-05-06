'use client'

import Link from 'next/link';

export default function HomeLink() {

    return (
        <Link className="homelink" title="Return to Home" href="/">
            <img src="/logo_nobg_squared.png" alt="logo" />
        </Link>
    );
}