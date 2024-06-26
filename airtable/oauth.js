import { generateAuthURI } from "./pkce.js";
import opener from "opener"


export default async function startAuthFlow() {
    try {
        console.log("Getting token");
        const authURI = await generateAuthURI();
        opener(authURI);
    } catch (error) {
        console.log(error);
    }
}