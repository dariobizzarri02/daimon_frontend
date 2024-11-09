"use client"

import { useState, useEffect, use } from "react";
import axios from "axios";
import { HomeLink, MarkdownPage } from "@/app/commons";

type Params = Promise<{ article: string[] }>;

export default function GuildPage (props: { params: Params }) {
    const params = use(props.params);
    const [page, setPage] = useState<string>("");
    const [name, setName] = useState<string>("");

    useEffect(() => {
        const fullPath = params.article.join("/");
        const repoName = "daimon_canon";
        const repoOwner = "masterbaseguild";
        const branchName = "live";
        const filePath = `${fullPath}.md`;

        axios({
            method: "get",
            url: `https://raw.githubusercontent.com/${repoOwner}/${repoName}/${branchName}/${filePath}`,
        })
            .then(page => {
                console.log(page.data);
                setPage(page.data);
                setName(params.article[params.article.length-1]);
            })
    }, []);
    
    return (
        <div>
            <h1>Universe</h1>
            <MarkdownPage page={page}/>
            <HomeLink/>
        </div>
    );
}