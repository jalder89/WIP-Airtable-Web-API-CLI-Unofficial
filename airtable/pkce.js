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

  // Provides a getter for OAuth to fetch a PKCE code challenge
  async function getPKCECodeChallenge() {
    process.env.PKCE_CODE_VERIFIER = generateVerifier();
    const codeChallenge = await generateCodeChallenge(process.env.PKCE_CODE_VERIFIER);
    return codeChallenge;
  }
  
export {
    getPKCECodeChallenge
}