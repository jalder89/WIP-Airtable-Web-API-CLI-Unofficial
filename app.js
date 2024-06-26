import express from "express"
import { selectMenu } from "./inquirer/inquirer-utils.js";
import inquirerConfigs from "./inquirer/inquirer-config.js";


const app = express();

app.get('/oauth/redirect', (req, res) => {
    console.log(req);
});

app.listen(Number(process.env.PORT || 3000), () => {
    console.log(`App listening on ${process.env.PORT || 3000}`)
});

await selectMenu(inquirerConfigs.mainMenuConfig);