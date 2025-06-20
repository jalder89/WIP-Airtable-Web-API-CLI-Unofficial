import qs from 'qs';
import axios from "axios"
import opener from "opener"
import crypto from "crypto"
import { getPKCECodeChallenge } from "./pkce.js"
import { updateTokenFile } from "./utils.js";


function logError(error) {
    console.error("OAuth Error:", error?.response?.data || error.message);
}

// Construct the Authorization URL and open it in the users browser to prepare for auth code redirection
export async function startAuthFlow() {
    try {
        console.log("Starting Auth Flow");
        const authorizationUrl = new URL(`https://airtable.com/oauth2/v1/authorize`);
        const state = crypto.randomBytes(100).toString('base64url');
        const codeChallenge = await getPKCECodeChallenge();
        authorizationUrl.searchParams.set('code_challenge', codeChallenge);
        authorizationUrl.searchParams.set('code_challenge_method', "S256");
        authorizationUrl.searchParams.set('state', state);
        authorizationUrl.searchParams.set('client_id', process.env.AIRTABLE_CLIENT_ID);
        authorizationUrl.searchParams.set('redirect_uri', `http://localhost:${process.env.PORT || 3000}/oauth/redirect`);
        authorizationUrl.searchParams.set('response_type', 'code');
        authorizationUrl.searchParams.set('scope', "data.records:read data.records:write schema.bases:read schema.bases:write webhook:manage");
        opener(authorizationUrl.toString());
    } catch (error) {
        logError(error);
    }
}

// Construct token request to mint an Auth Token
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
            updateTokenFile(process.env.AIRTABLE_REFRESH_TOKEN);
            res.send("Authorization complete, you may now close this window.")
        });
    } catch (error) {
        logError(error);
        res.status(500).send("Authorization failed, please try again.");
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
            updateTokenFile(process.env.AIRTABLE_REFRESH_TOKEN);
            console.log("Refresh complete, you may now continue working.");
        });
    } catch (error) {
        logError(error);
    }
}