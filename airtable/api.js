import axios from "axios"
import inquiryFlows from "../inquirer/inquirer-flows.js";
import { getMenuConfig } from "../inquirer/inquirer-config.js";


export async function createRecords() {
    const fields = await inquiryFlows.createRecordFlow();
    axios({
        method: "post",
        url: `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}`,
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
        },
        data: {
            fields: fields
        }
    });
}

export async function listBases() {
    return axios({
        method: "get",
        url: `https://api.airtable.com/v0/meta/bases`,
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        }
    }).then((response) => {
        return getMenuConfig("selectBase", response.data);
    });
}

export async function listRecords(baseId, tableName, limit = 5) {
    return axios({
        method: "get",
        url: `https://api.airtable.com/v0/${baseId}/${encodeURI(tableName)}?pageSize=5&maxRecords=${limit}`,
        headers: {
            Authorization: `Bearer ${process.env.AIRTABLE_ACCESS_TOKEN}`,
        }
    }).then((response) => {
        return response;
    });
}