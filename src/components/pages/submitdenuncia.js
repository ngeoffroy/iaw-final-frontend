import React, { useState } from "react";
import { TextField, Button, Container, Typography, Stack } from "@mui/material";
import Navbar from "../navbar/navbar";
import { postDenuncia } from "../../utils/loaders";
import Alert from "@mui/material/Alert";

export default function SubmitDenuncia() {
  const [formulario, setFormulario] = useState({
    titulo: "",
    descripcion: "",
    imagen: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("titulo", formulario["titulo"]);
    formData.append("descripcion", formulario["descripcion"]);
    formData.append("imagen", formulario["imagen"]);

    let response = await postDenuncia(formData);
    if ((response.status = 201)) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      setFormulario({
        titulo: "",
        descripcion: "",
        imagen: "",
      });
    } else {
      alert("Error al enviar la denuncia ...");
    }
  };

  const handleImagenChange = (event) => {
    const imagenSeleccionada = event.target.files[0];
    setFormulario({ ...formulario, imagen: imagenSeleccionada });
  };

  return (
    <Stack mt={10}>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Nueva denuncia
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Titulo"
            name="titulo"
            value={formulario.titulo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripcion"
            name="descripcion"
            value={formulario.descripcion}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <input
            accept="image/*"
            id="imagen"
            type="file"
            onChange={handleImagenChange}
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Enviar denuncia
          </Button>
        </form>
      </Container>
      {showSuccess && <Alert severity="success">Operación exitosa.</Alert>}
    </Stack>
  );
}
