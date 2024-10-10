const express = require("express");
const bodyParser = require("body-parser");
const docx = require("docx");
const cors = require("cors");
const { Document, Packer, Paragraph, TextRun } = require("docx"); // Librería para generar el archivo Word
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3001;

// Middleware para manejar el body de la solicitud
app.use(bodyParser.json());
app.use(cors()); // Permitir solicitudes desde el frontend

// Ruta para manejar el formulario y generar el archivo de Word
app.post("/generate-cv", async (req, res) => {
  const { name, email, phone, education, experience } = req.body; // Obtener datos del formulario
  if (!name || !email || !phone || !education || !experience) {
    return res.status(400).send("Missing required fields");
  }

  // Crear un nuevo documento Word
  const doc = new docx.Document({
    sections: [],
  });

  // Agregar contenido al documento (CV básico)
  doc.addSection({
    children: [
      new Paragraph({
        children: [
          new TextRun({ text: "Curriculum Vitae", bold: true, size: 32 }),
        ],
        alignment: "center",
      }),
      new Paragraph({
        children: [new TextRun({ text: `Name: ${name}` })],
      }),
      new Paragraph({
        children: [new TextRun({ text: `Email: ${email}` })],
      }),
      new Paragraph({
        children: [new TextRun({ text: `Phone: ${phone}` })],
      }),
      new Paragraph({
        children: [new TextRun({ text: `Education: ${education}` })],
      }),
      new Paragraph({
        children: [new TextRun({ text: `Experience: ${experience}` })],
      }),
    ],
  });

  // Generar el archivo Word
  const buffer = await Packer.toBuffer(doc);
  const filePath = path.join(__dirname, "cv.docx"); // Guardar el archivo temporalmente

  // Escribir el archivo al sistema de archivos
  fs.writeFileSync(filePath, buffer);

  // Enviar el archivo generado al cliente
  res.download(filePath, "cv.docx", (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Error generating the CV");
    }

    // Eliminar el archivo después de enviarlo
    fs.unlinkSync(filePath);
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
