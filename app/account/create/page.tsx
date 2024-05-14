"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { HomeLink } from "@/app/commons";

export const AccountCreate= () => {
    const [display, setDisplay] = useState<string>("");

    useEffect(() => {
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user",
            withCredentials: true
        })
            .then(user => {
                if(!user.data) {
                    location.href = "/account/login";
                    return;
                }
                if(user.data.display) {
                    location.href = "/account";
                    return;
                }
            })
    }, []);

    const handleSubmit = () => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/display",
            data: {
                display: display
            },
            withCredentials: true
        })
            .then(() => {
                location.href = "/account";
            });
    }

    const handleLogout = () => {
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth/logout",
            withCredentials: true
        })
            .then(() => {
                location.href = "/";
            });
    };

    return (
        <div>
            <h1>Create User</h1>
            <div className="formtab">
                <input className="form" type="text" placeholder="Display Name" onChange={(e) => setDisplay(e.target.value)} />
                <button className="form" onClick={handleSubmit}>Submit</button>
            </div>
            <button className="button" onClick={handleLogout}>Logout</button>
            <HomeLink/>
        </div>
    );
}