const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const KEYFILEPATH = path.join(__dirname, '../config/japs-page-1730994915246-d40c675a31bc.json');
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

const drive = google.drive({ version: 'v3', auth });

exports.uploadImage = async (req, res) => {
  try {
    const fileMetadata = {
      name: req.file.originalname,
      parents: ['14Ff4b9_6Wjpv23XYEyJf_bf7sUsxo_QC'], // 👈 tu carpeta compartida
    };

    const media = {
      mimeType: req.file.mimetype,
      body: fs.createReadStream(req.file.path),
    };

    const response = await drive.files.create({
      resource: fileMetadata,
      media,
      fields: 'id, webViewLink, webContentLink',
      supportsAllDrives: true,
    });

    // Limpia el archivo temporal
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      file: response.data,
    });
  } catch (error) {
    console.error('Error subiendo archivo:', error);
    res.status(500).json({ error: error.message });
  }
};
