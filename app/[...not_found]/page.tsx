"use client"

import { HomeLink } from "@/app/commons";
import { useEffect } from "react";

export default function NotFound () {

    useEffect(() => {
        document.title = `Not Found - Daimon`;
    }, []);

    return (
        <div>
            <h1>404</h1>
            <h2>Page not found</h2>
            <HomeLink/>
        </div>
    );
}