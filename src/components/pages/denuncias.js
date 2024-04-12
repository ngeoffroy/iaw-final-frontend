import React, { useState, useEffect } from "react";
import { loadDenuncias } from "../../utils/loaders";
import DenunciaCard from "../cards/denuncia";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Navbar from "../../components/navbar/navbar";
import { Typography } from "@mui/material";
import Empty from "../../imagenes/empty.gif";

export default function Denuncias() {
  const [denuncias, setDenuncias] = useState([]);

  useEffect(() => {
    loadDenuncias(setDenuncias);
  }, []);

  return (
    <Stack mt={10}>
      <Navbar />
      <Grid container mt={5} ml={1} spacing={1} justifyContent="center">
        {denuncias.length === 0 && (
          <Grid item xs={3}>
            <Typography> No se encuentran denuncias registradas</Typography>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
              }}
              alt="Empty."
              src={Empty}
            />
          </Grid>
        )}
        {denuncias.length > 0 &&
          denuncias.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <DenunciaCard
                key={item.id}
                id={item.id}
                titulo={item.titulo}
                imagen={item.imagen}
                descripcion={item.descripcion}
                status={item.status}
                autorizado={item.autorizado}
                pena={item.pena}
              />
            </Grid>
          ))}
      </Grid>
    </Stack>
  );
}
