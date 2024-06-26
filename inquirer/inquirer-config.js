import { Separator } from "@inquirer/prompts";

const mainMenuConfig = {
    message: "Select an option",
    choices: [
        {
            name: "login",
            value: "login",
            description: "Obtain an OAuth Access Token"
        }
    ]
}

const inquirerConfigs = {
    mainMenuConfig,
}

export default inquirerConfigs;