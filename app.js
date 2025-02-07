import fs from 'fs';
import { setupServer, stopServer } from "./server.js";
import { selectMenu, inputMenu } from "./inquirer/inquirer-utils.js";
import { getMenuConfig } from "./inquirer/inquirer-config.js";
import { startAuthFlow, refreshAuthFlow } from "./airtable/oauth.js";
import { createRecords, listBases, listRecords } from "./airtable/api.js";
import { createTokenFile, readTokenFile } from "./airtable/utils.js";
import chalk from 'chalk';
import 'dotenv/config'


setupServer();

let menu = "main"
let menuChoice = "";
let waiting = "";

console.log("Loading...");
if(!fs.existsSync('./airtable/store.json')){
    console.log("No token file found...");
    console.log("Creating file...");
    try {
        createTokenFile();
    } catch (error) {
        console.log("Error creating token file...");
        
    }
} else {
    console.log("Checking token...");
    readTokenFile();
    try {
        await refreshAuthFlow();
    } catch (error) {
        console.log("Token expired, please login again...");
    }
}

while(menuChoice !== "exit") {
    waiting = process.env.WAITING;
    if (waiting == "false") {
        let menuConfig = await getMenuConfig(menu);
        menuChoice = await selectMenu(menuConfig);
        switch (menuChoice) {
            case "login":
                try {
                    if(!process.env.AIRTABLE_REFRESH_TOKEN){
                        await startAuthFlow();
                        console.log("Awaiting login grant...");
                        process.env.WAITING = "true";
                    } else {
                        console.log("Token already exists");
                    }
                } catch (error) {
                    console.log(error);
                }
                break;
            case "refresh-login":
                try {
                    if(process.env.AIRTABLE_REFRESH_TOKEN){
                        await refreshAuthFlow();
                    } else {
                        console.log("No token to refresh");
                    }
                } catch (error) {
                    console.log(error);
                }
                break;
            case "selectBase":
                menuConfig = await listBases();
                let chosenBaseId = await selectMenu(menuConfig);
                process.env.AIRTABLE_BASE_ID = chosenBaseId;
                break;
            case "selectTable":
                process.env.AIRTABLE_TABLE_NAME = await inputMenu(
                    "Enter the Name of the Table to select (Must be exact match): "
                )
                try {
                    let response = await listRecords(process.env.AIRTABLE_BASE_ID, process.env.AIRTABLE_TABLE_NAME, 1);
                    if (response.statusText == "OK") {
                        console.log(chalk.green("Table Found"));
                    }
                } catch (error) {
                    console.log(error);
                }
                break;
            case "createRecord":
                await createRecords();
                break;
            case "exit":
                stopServer();
                menuChoice = "exit"
                break;
            default:
                break;
        }
    } else {
        // Timeout for 1 second to await for the server to finish
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}
