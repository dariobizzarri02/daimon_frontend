"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import HomeLink from "@/app/homelink";

export default function AccountLogin() {
    const [loginMethod, setLoginMethod] = useState<string>("");
    const [localUsername, setLocalUsername] = useState<string>("");
    const [localPassword, setLocalPassword] = useState<string>("");
    const [minecraftUsername, setMinecraftUsername] = useState<string>("");
    const [minecraftPassword, setMinecraftPassword] = useState<string>("");

    useEffect(() => {
        axios({
            method: "get",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user",
            withCredentials: true
        })
            .then(user => {
                if(user.data) {
                    location.href = "/account";
                    return;
                }
            });
        const url = new URL(window.location.href);
        const method = url.searchParams.get("method");
        if(method&&["local","minecraft","discord"].includes(method)) {
            setLoginMethod(method);
        }
        else {
            setLoginMethod("local");
        }
    }, []);
    
    const handleLocalLogin = () => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth/local",
            data: {
                username: localUsername,
                password: localPassword,
                register: false
            },
            withCredentials: true
        })
            .then(() => {
                location.href = "/account";
            });
    };

    const handleMinecraftLogin = () => {
        axios({
            method: "post",
            url: process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth/minecraft",
            data: {
                username: minecraftUsername,
                password: minecraftPassword
            },
            withCredentials: true
        })
            .then(() => {
                location.href = "/account";
            });
    }
    
    return (
        <div>
            <h1>Login</h1>
            <div className="tab">
                <button className={loginMethod==="local"?"active":""} onClick={() => setLoginMethod("local")}>Local</button>
                <button className={loginMethod==="minecraft"?"active":""} onClick={() => setLoginMethod("minecraft")}>Minecraft</button>
                <button className={loginMethod==="discord"?"active":""} onClick={() => setLoginMethod("discord")}>Discord</button>
            </div>
            {loginMethod==="local"&&<>
                <div className="formtab">
                    <input className="form"
                    type="text"
                    placeholder="username"
                    value={localUsername}
                    onChange={(e) => setLocalUsername(e.target.value)}
                    />
                    <input className="form"
                        type="password"
                        placeholder="password"
                        value={localPassword}
                        onChange={(e) => setLocalPassword(e.target.value)}
                    />
                    <button className="form" onClick={handleLocalLogin}>Login</button>
                    <Link className="form center" href="/account/register">Register instead?</Link>
                </div>
            </>
            }
            {loginMethod==="minecraft"&&<>
                <div className="formtab">
                    <input className="form"
                    type="text"
                    placeholder="username"
                    value={minecraftUsername}
                    onChange={(e) => setMinecraftUsername(e.target.value)}
                    />
                    <input className="form"
                        type="password"
                        placeholder="password"
                        value={minecraftPassword}
                        onChange={(e) => setMinecraftPassword(e.target.value)}
                    />
                    <button className="form" onClick={handleMinecraftLogin}>Login</button>
                </div>
                <h3>In order to register your Minecraft Account and gain points through it,</h3>
                <h3>join the mc.masterbaseguild.it server and perform the /register command.</h3>
            </>
            }
            {loginMethod==="discord"&&<>
                <div className="formtab">
                    <a className="form center" href={process.env.NEXT_PUBLIC_BACKEND_ENDPOINT+"/user/auth/discord"}>
                        Login with Discord
                    </a>
                </div>
                <h3>In order to gain points through your Discord Account,</h3>
                <h3>join the <a href="https://discord.gg/R66FeFh8aC" target="_blank" rel="noreferrer">MasterBase Discord Server</a> and link your account.</h3>
            </>
            }
			<HomeLink/>
        </div>
    );
}