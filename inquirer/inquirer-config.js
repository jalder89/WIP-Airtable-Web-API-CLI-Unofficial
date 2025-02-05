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
            name: "Refresh Login Manually",
            value: "refresh-login",
            description: "Obtain an OAuth Access Token"
        },
        {
            name: "Create Record",
            value: "createRecord",
            description: "Create a record in a table (Must login first)"
        },
        {
            name: "Exit",
            value: "exit",
            description: "Exit CLI"
        }
    ]
}

const inquirerConfigs = {
    mainMenuConfig,
}

export default inquirerConfigs;