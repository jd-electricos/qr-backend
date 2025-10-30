// config/googleDrive.js
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const KEYFILEPATH = path.join(__dirname, 'japs-page-1730994915246-e47ac50f3c63.json');
const SCOPES = ['https://www.googleapis.com/auth/drive'];

async function authorize() {
  const apikeys = JSON.parse(fs.readFileSync(KEYFILEPATH, 'utf8'));

  const auth = new google.auth.JWT(
    apikeys.client_email,
    null,
    apikeys.private_key,
    SCOPES
  );

  await auth.authorize();
  return auth;
}

module.exports = authorize;
