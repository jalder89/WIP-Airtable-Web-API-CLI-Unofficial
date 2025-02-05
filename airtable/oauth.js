import axios from "axios"
import qs from 'qs';
import { generateAuthURI } from "./pkce.js"
import opener from "opener"


export async function startAuthFlow() {
    try {
        console.log("Getting token");
        const authURI = await generateAuthURI();
        opener(authURI);
    } catch (error) {
        console.log(error);
    }
}

export async function createAuth(req, res) {
    try {
        await axios({
            method: "post",
            url: "https://airtable.com/oauth2/v1/token",
            headers: {
                "Authorization": `Basic ${process.env.AIRTABLE_ENCODED_CREDENTIALS}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: qs.stringify ({
                code: req.query.code,
                client_id: process.env.AIRTABLE_CLIENT_ID,
                redirect_uri: `http://localhost:${process.env.PORT || 3000}/oauth/redirect`,
                grant_type: "authorization_code",
                code_verifier: process.env.PKCE_CODE_VERIFIER
                
            }),
        }).then((response) => {
            process.env.AIRTABLE_ACCESS_TOKEN = response.data.access_token;
            process.env.AIRTABLE_REFRESH_TOKEN = response.data.refresh_token;
            res.status(200).send("Authorization complete, you may now close this window.");
        });
    } catch (error) {
        console.log(error)
    }
}

export async function refreshAuthFlow() {
    try {
        console.log("Refreshing token...");
        const data = { grant_type: 'refresh_token', refresh_token: process.env.AIRTABLE_REFRESH_TOKEN };
        await axios({
            method: "post",
            url: `https://airtable.com/oauth2/v1/token`,
            headers: {
                "Authorization": `Basic ${process.env.AIRTABLE_ENCODED_CREDENTIALS}`,
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: qs.stringify(data)
        }).then((response) => {
            console.log(response.statusText);
            process.env.AIRTABLE_ACCESS_TOKEN = response.data.access_token;
            process.env.AIRTABLE_REFRESH_TOKEN = response.data.refresh_token;
            console.log("Refresh complete, you may now continue working.");
        });
    } catch (error) {
        console.log(error);
    }
}