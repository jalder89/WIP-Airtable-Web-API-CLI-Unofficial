# Airtable-Web-API-CLI
A simple CLI for interacting with the Airtable Web API

### Warning
This is a work in progress, things will be unfinished and may be broken while under development.

# VS Code Setup
1. Locally clone the repo to your desired dev folder: `git clone https://github.com/jalder89/Airtable-Web-API-CLI.git`
2. Open cloned app folder in VS Code
3. In a terminal in VS Code you will need to install require packages via npm: `npm install`
4. You will then need to create a `.env` file for environment variables in the root of the app. More instructions below.
   * For more on dotenv check: https://www.npmjs.com/package/dotenv
5. Create an OAuth Integration with a name of your choosing at https://airtable.com/create/oauth
6. Set Redirect URI to http://localhost:3000/oauth/redirect and save.
7. Set the Scopes for your app, the current CLI can create records and so `data.records:write` is required, no others are currently used. 
8. Save your Client ID to your .env file as `AIRTABLE_CLIENT_ID="clientIDGoesHere"`
9. Still in your OAuth Integration page, generate a client secret and save it somewhere safe then add it to your .env file as `AIRTABLE_CLIENT_SECRET="addSecretHere"`
10. Save your OAuth Integration.

## Generating Encoded Credentials for Basic Auth
1. Generate a Base64 encoded string for clientID:clientSecret by opening a terminal that has openssl and adjust this command:
   * `echo -n clientID:clientSecret | openssl base64`
     * **NOTE**: Terminal output includes line breaks, make sure to remove line breaks when saving the string. It should be a single line of text. I do not recommend using online tools for base64 encoding a security string.
3. Save your newly encoded credentials from openssl to .env as `AIRTABLE_ENCODED_CREDENTIALS="opensslOutputWithoutLineBreaks"`

## Setup Variables for Record Creation
At this time finding and selecting bases, tables, and records is not yet supported. So to create a record in a table you will need to setup an environment variable for your desired Base and Table.
To do this, open your .env file and add AIRTABLE_BASE_ID and AIRTABLE_TABLE_ID with the IDs for your desired base and table. Base IDs begin with app and Table IDs begin with tbl.
    

### Environment Variables Required for Auth
* AIRTABLE_CLIENT_ID
* AIRTABLE_CLIENT_SECRET
* AIRTABLE_ENCODED_CREDENTIALS - Base64 encoded string representation of clientID:clientSecret

### Environment Variables Require for Create Record
* AIRTABLE_BASE_ID
* AIRTABLE_TABLE_ID
