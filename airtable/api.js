import axios from "axios"
import inquiryFlows from "../inquirer/inquirer-flows.js";

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