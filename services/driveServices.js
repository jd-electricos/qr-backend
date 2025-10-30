// services/driveService.js
const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

async function uploadFile(auth, filePath, folderId) {
  const drive = google.drive({ version: 'v3', auth });
console.log(folderId)
console.log("--------------------------")
  const fileMetadata = {
    name: path.basename(filePath),
    parents: ["14Ff4b9_6Wjpv23XYEyJf_bf7sUsxo_QC"],
  };

  const media = {
    mimeType: 'application/octet-stream',
    body: fs.createReadStream(filePath),
  };

  try {
    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id, webViewLink',
    });

    console.log('✅ Archivo subido con ID:', response.data.id);
    return response.data;
  } catch (error) {
    console.error('❌ Error al subir archivo:', error.message);
    throw error;
  }
}

module.exports = { uploadFile };
