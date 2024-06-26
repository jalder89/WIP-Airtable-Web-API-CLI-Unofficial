import { select, input } from '@inquirer/prompts';


export async function selectMenu(config) {
    return await select(config);
}

export async function inputMenu(message) {
    return await input({
        message: message,
    });
}