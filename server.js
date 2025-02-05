import express from "express"
import { createAuth } from "./airtable/oauth.js";

const app = express();
let server = null;

export function setupServer() {
    app.get('/oauth/redirect', async (req, res) => {
        await createAuth(req, res);
    });
    server = app.listen(Number(process.env.PORT || 3000));
}

export function stopServer() {
    server.close();
    process.exit();
}