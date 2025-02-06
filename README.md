# Airtable-Web-API-CLI
A simple CLI for interacting with the Airtable Web API

### Warning
This is a work in progress, things will be unfinished and may be broken while under development.

# VS Code Setup
1. Locally clone the repo to your desired dev folder: `git clone https://github.com/jalder89/Airtable-Web-API-CLI.git`
2. Open cloned app folder in VS Code
3. In a terminal in VS Code you will need to install require packages via npm: `npm install`
4. You will then need to create a `.env` file for environment variables in the root of the app.
   * For more on dotenv check: https://www.npmjs.com/package/dotenv

### Environment Variables Required for Auth
* AIRTABLE_CLIENT_ID
* AIRTABLE_CLIENT_SECRET
* AIRTABLE_ENCODED_CREDENTIALS - Base64 encoded string representation of clientID:clientSecret

### Environment Variables Require for Create Record
* AIRTABLE_BASE_ID
* AIRTABLE_TABLE_ID
