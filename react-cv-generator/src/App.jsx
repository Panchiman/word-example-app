import React, { useState } from "react";
import axios from "axios"; // Para hacer solicitudes al backend
import "./App.css"; // Estilos personalizados

function App() {
  // Estado para manejar los campos del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
  });

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar la solicitud al backend para generar el archivo Word
      const response = await axios.post(
        "http://localhost:3001/generate-cv",
        formData,
        {
          responseType: "blob", // Obtener el archivo como blob
        }
      );

      // Crear un enlace para descargar el archivo
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "cv.docx"); // Nombre del archivo
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating CV:", error);
    }
  };

  return (
    <div className="App">
      <h1>CV Generator</h1>
      <form onSubmit={handleSubmit}>
        {/* Campo para el nombre */}
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        {/* Campo para el correo */}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        {/* Campo para el teléfono */}
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        {/* Campo para la educación */}
        <label>Education:</label>
        <textarea
          name="education"
          value={formData.education}
          onChange={handleChange}
          required
        ></textarea>

        {/* Campo para la experiencia */}
        <label>Experience:</label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        ></textarea>

        {/* Botón para enviar */}
        <button type="submit">Generate CV</button>
      </form>
    </div>
  );
}

export default App;
