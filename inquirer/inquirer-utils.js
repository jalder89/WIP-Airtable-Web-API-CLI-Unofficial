import { select } from '@inquirer/prompts';


export async function selectMenu(config) {
    return await select(config);
}