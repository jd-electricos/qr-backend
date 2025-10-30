const { google } = require("googleapis");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Ruta a tu JSON de credenciales descargado de Google Cloud Console
const KEYFILEPATH = path.join(__dirname, "../japs-page-1730994915246-d40c675a31bc.json");

// Scope necesario para manipular Google Drive
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];

// Crear el cliente de autenticación
const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});

// Crear el servicio de Drive
const driveService = google.drive({ version: "v3", auth });

module.exports = driveService;
