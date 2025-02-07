import { Separator } from "@inquirer/prompts";
import chalk from "chalk";

let mainMenuConfig = {
    message: "Select an option",
    choices: []
}

const theme = {
    style: {
        separator: (text) => chalk.green(text),
    },
    decorator: (text) => chalk.yellow(text),
}

export async function getMenuConfig(menu, apiResponse = "None") {
    switch (menu) {
        case "main":
            if(!process.env.AIRTABLE_REFRESH_TOKEN){
                mainMenuConfig.choices = [
                    new Separator(theme.decorator(" =") + theme.style.separator(" WIP Airtable CLI ") + theme.decorator("= ")),
                    {
                        name: "Login",
                        value: "login",
                        description: "Obtain an OAuth Access Token"
                    },
                    {
                        name: "Exit",
                        value: "exit",
                        description: "Exit CLI"
                    }
                ]
            } else if (!process.env.AIRTABLE_BASE_ID) {
                mainMenuConfig.choices = [
                    new Separator(theme.decorator(" =") + theme.style.separator(" WIP Airtable CLI ") + theme.decorator("= ")),
                    {
                        name: "Refresh Login Manually",
                        value: "refresh-login",
                        description: "Obtain an OAuth Access Token"
                    },
                    {
                        name: "Select Base",
                        value: "selectBase",
                        description: "Select a base from a list of your granted bases."
                    },
                    {
                        name: "Exit",
                        value: "exit",
                        description: "Exit CLI"
                    }
                ]
            } else if (process.env.AIRTABLE_BASE_ID && !process.env.AIRTABLE_TABLE_NAME) {
                mainMenuConfig.choices = [
                    new Separator(theme.decorator(" =") + theme.style.separator(" WIP Airtable CLI ") + theme.decorator("= ")),
                    {
                        name: "Refresh Login Manually",
                        value: "refresh-login",
                        description: "Obtain an OAuth Access Token"
                    },
                    {
                        name: "Select New Base",
                        value: "selectBase",
                        description: "Select a base from a list of your granted bases."
                    },
                    {
                        name: "Select Table",
                        value: "selectTable",
                        description: "Select a table from the selected base."
                    },
                    {
                        name: "Exit",
                        value: "exit",
                        description: "Exit CLI"
                    }
                ]
            } else if (process.env.AIRTABLE_BASE_ID && process.env.AIRTABLE_TABLE_NAME) {
                mainMenuConfig.choices = [
                    new Separator(theme.decorator(" =") + theme.style.separator(" WIP Airtable CLI ") + theme.decorator("= ")),
                    {
                        name: "Refresh Login Manually",
                        value: "refresh-login",
                        description: "Obtain an OAuth Access Token"
                    },
                    {
                        name: "Select New Base",
                        value: "selectBase",
                        description: "Select a base from a list of your granted bases."
                    },
                    {
                        name: "Select New Table",
                        value: "selectTable",
                        description: "Select a table from the selected base."
                    },
                    {
                        name: "Create Record",
                        value: "createRecord",
                        description: "Create a new record in the selected table."
                    },
                    {
                        name: "Exit",
                        value: "exit",
                        description: "Exit CLI"
                    }
                ]
            }
            return mainMenuConfig;
        case "selectBase":
            let bases = {};
            let offset = "";
            if(apiResponse !== "None"){
                bases = apiResponse.bases;
                offset = apiResponse.offset;
            }
            let choices = [
                new Separator(theme.decorator(" =") + theme.style.separator(" Bases ") + theme.decorator("= ")),
            ];
            for (let i = 0; i < bases.length; i++) {
                choices.push({
                    name: bases[i].name,
                    value: bases[i].id,
                    description: bases[i].permissionLevel
                });
            }
            choices.push(new Separator(theme.decorator(" =") + theme.style.separator(" Navigation Actions ") + theme.decorator("= ")));
            choices.push({
                name: "Back",
                value: "back",
                description: "Return to main menu"
            });
            return {
                message: "Select a base",
                choices: choices,
            }
        case "selectTable":
            process.env.AIRTABLE_TABLE_NAME = await inquiry.inputMenu(
                "Enter the Name of the Table to select (Must be exact match): "
            )
            try {
                
            } catch (error) {
                console.log(error);
            }
        default:
            break;
    }
}

const inquirerConfigs = {
    mainMenuConfig,
}

export default inquirerConfigs;