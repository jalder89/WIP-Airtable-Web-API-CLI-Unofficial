import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createTokenFile = async () => {
    const tokenPath = path.join(__dirname, './store.json');
    const tokenDir = path.dirname(tokenPath);
    
    if (!fs.existsSync(tokenDir)) {
        fs.mkdirSync(tokenDir, { recursive: true });
    }
    
    if (!fs.existsSync(tokenPath)) {
        fs.writeFileSync(tokenPath, JSON.stringify({}, null, 2));
    } else {
        const tokens = JSON.parse(fs.readFileSync(tokenPath));
        process.env.AIRTABLE_REFRESH_TOKEN = tokens.refresh_token;
    }
}

export const updateTokenFile = async (refreshToken) => {
    const tokenPath = path.join(__dirname, './store.json');
    const storedToken = JSON.parse(fs.readFileSync(tokenPath));
    storedToken.refresh_token = refreshToken;
    fs.writeFileSync(tokenPath, JSON.stringify(storedToken, null, 2));
}

export const readTokenFile = async () => {
    const tokenPath = path.join(__dirname, './store.json');
    const storedToken = JSON.parse(fs.readFileSync(tokenPath));
    process.env.AIRTABLE_REFRESH_TOKEN = storedToken.refresh_token;
}