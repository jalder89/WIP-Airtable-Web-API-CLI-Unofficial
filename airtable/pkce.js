import crypto from "crypto"

function generateVerifier() {
    return crypto.randomBytes(96).toString('base64url'); // 128 characters
  }
  
  async function generateCodeChallenge(verifier) {
    const codeChallenge = crypto
        .createHash('sha256')
        .update(verifier) // hash the code verifier with the sha256 algorithm
        .digest('base64') // base64 encode, needs to be transformed to base64url
        .replace(/=/g, '') // remove =
        .replace(/\+/g, '-') // replace + with -
        .replace(/\//g, '_'); // replace / with _ now base64url encoded
    return codeChallenge;
  }

  // Adjust query params for authroize redirect here
  async function generateAuthURI() {
    const state = crypto.randomBytes(100).toString('base64url');
    process.env.PKCE_CODE_VERIFIER = generateVerifier();
    const codeChallenge = await generateCodeChallenge(process.env.PKCE_CODE_VERIFIER);
    // build the authorization URL
    const authorizationUrl = new URL(`https://airtable.com/oauth2/v1/authorize`);
    authorizationUrl.searchParams.set('code_challenge', codeChallenge);
    authorizationUrl.searchParams.set('code_challenge_method', "S256");
    authorizationUrl.searchParams.set('state', state);
    authorizationUrl.searchParams.set('client_id', process.env.AIRTABLE_CLIENT_ID);
    authorizationUrl.searchParams.set('redirect_uri', `http://localhost:${process.env.PORT || 3000}/oauth/redirect`);
    authorizationUrl.searchParams.set('response_type', 'code');
    authorizationUrl.searchParams.set('scope', "data.records:read data.records:write schema.bases:read schema.bases:write webhook:manage");
    return authorizationUrl.toString();
  }
  
export {
    generateAuthURI
}