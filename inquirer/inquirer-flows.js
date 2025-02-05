import * as inquiry from './inquirer-utils.js'


async function createRecordFlow() {
    const Name = await inquiry.inputMenu(
        "Enter the Name of the task to create: "
    )
    const Notes = await inquiry.inputMenu(
        "Enter a Note if required: "
    )
    const Status = await inquiry.selectMenu({
        message: "Select a task status: ",
        choices: [
            {
                name: "To-Do",
                value: "Todo",
                description: "This task needs to be done"
            },
            {
                name: "In progress",
                value: "In progress",
                description: "This task is pending review"
            },
            {
                name: "Done",
                value: "Done",
                description: "This task has been completed"
            }
        ]
    })
    const recordFields = {
        Name,
        Notes,
        Status
    }
    return recordFields
}

const inquiryFlows = {
    createRecordFlow
}

export default inquiryFlows