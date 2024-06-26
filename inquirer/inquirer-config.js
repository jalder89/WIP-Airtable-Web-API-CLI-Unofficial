import { Separator } from "@inquirer/prompts";

const mainMenuConfig = {
    message: "Select an option",
    choices: [
        {
            name: "Login",
            value: "login",
            description: "Obtain an OAuth Access Token"
        },
        {
            name: "Create Record",
            value: "createRecord",
            description: "Create a record in a table (Must login first)"
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