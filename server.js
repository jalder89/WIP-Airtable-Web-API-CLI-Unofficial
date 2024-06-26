import express from "express"
import axios from "axios"
import qs from "qs"

const app = express();
let server = null;

export function setupServer() {
    app.get('/oauth/redirect', async (req, res) => {
        try {
            await axios({
                method: "post",
                url: "https://airtable.com/oauth2/v1/token",
                headers: {
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
                res.status(200).send("Authorization complete, you may now close this window.");
            });
        } catch (error) {
            console.log(error)
        }
    });
    
    server = app.listen(Number(process.env.PORT || 3000));
}

export function stopServer() {
    server.close();
}