// driveController.js
const authorize = require('../config/googleDrive');
const driveService = require('../services/driveServices');

// Listar archivos
exports.listFiles = async (req, res) => {
  try {
    const auth = await authorize();
    const files = await driveService.listFiles(auth);
    res.json({ files });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Subir archivo
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ningún archivo' });
    }

    const auth = await authorize();
    const folderId = '14Ff4b9_6Wjpv23XYEyJf_bf7sUsxo_QC'; // sin array []
    const filePath = req.file.path;

    console.log('📁 Subiendo archivo desde:', filePath);

    const result = await driveService.uploadFile(auth, filePath, folderId);

    const fileLink = `https://drive.google.com/file/d/${result.id}/view`;

    fs.unlink(filePath, (err) => {
      if (err) console.warn('⚠️ No se pudo eliminar el archivo local:', err.message);
    });

    res.json({
      success: true,
      id: result.id,
      link: fileLink,
    });
  } catch (error) {
    console.error('❌ Error al subir a Google Drive:', error);
    res.status(500).json({ error: error.message });
  }
};

// Actualizar archivo
exports.updateFile = async (req, res) => {
  try {
    const auth = await authorize();
    const { fileId, filePath } = req.body;
    const result = await driveService.updateFile(auth, fileId, filePath);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar archivo
exports.deleteFile = async (req, res) => {
  try {
    const auth = await authorize();
    const { fileId } = req.params;
    const result = await driveService.deleteFile(auth, fileId);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
