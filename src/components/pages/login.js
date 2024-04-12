import React from "react";
import { postLogin } from "../../utils/loaders";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import foto1 from "../../imagenes/foto1.jpg";
import foto2 from "../../imagenes/foto2.jpg";
import foto3 from "../../imagenes/foto3.jpg";

const defaultTheme = createTheme();

const images_carrusel = [foto1, foto2, foto3];

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let email = data.get("email");
    let password = data.get("password");
    let response = await postLogin(email, password);
    if (response) {
      if (response.status === 200) {
        navigate("denuncias");
      }
    } else {
      alert("Ups! Credenciales incorrectas ...");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "70vh" }}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7}>
          <Carousel autoPlay interval={7000}>
            {images_carrusel.map((image, index) => (
              <Paper
                key={index}
                style={{
                  backgroundImage: `url(${image})`,
                  height: "100vh",
                  backgroundSize: "cover",
                }}
              ></Paper>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "#3C57A0",
                }}
                sx={{ mt: 3, mb: 2 }}
              >
                Ingresar
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
