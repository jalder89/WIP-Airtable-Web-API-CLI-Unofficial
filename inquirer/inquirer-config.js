import { Separator } from "@inquirer/prompts";

const mainMenuConfig = {
    message: "Select an option",
    choices: [
        {
            name: "login",
            value: "login",
            description: "Obtain an OAuth Access Token"
        },
        {
            name: "exit",
            value: "exit",
            description: "Exit CLI"
        }
    ]
}

const inquirerConfigs = {
    mainMenuConfig,
}

export default inquirerConfigs;