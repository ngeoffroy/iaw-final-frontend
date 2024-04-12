import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import ConfirmAutorizacion from "../alerts/autorizacion";
import { CardActionArea, Typography, Collapse, Button } from "@mui/material";
import { red, green, orange } from "@mui/material/colors";
import { ESTADO_SOLICITUDES } from "../../utils/resources";
import { changeStatus } from "../../utils/loaders";
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";

export default function DenunciaCard({
  id,
  titulo,
  imagen,
  descripcion,
  status,
  autorizado,
  pena,
}) {
  const [showBotones, setShowBotones] = useState(false);
  const [confirmarAuto, setConfirmarAuto] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSuccessAuto, setShowSuccessAuto] = useState(false);

  const checkInicialDenuncia = (status) => {
    let estado = ESTADO_SOLICITUDES[status];
    return estado.charAt(0);
  };

  const checkColorDenuncia = (status) => {
    if (status === 0) {
      return orange[500];
    } else if (status === 1) {
      return red[500];
    } else {
      return green[500];
    }
  };

  const handleConfirm = () => {
    setConfirmarAuto(true);
  };

  const handleChangeStatus = async (event, id, status) => {
    event.preventDefault();
    let data = new FormData();
    data["id"] = id;
    data["status"] = status;
    let response = await changeStatus(data);
    if ((response.status = 200)) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } else {
      alert("Error en el cambio de estado ...");
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar
            sx={{ bgcolor: checkColorDenuncia(status) }}
            aria-label="recipe"
          >
            {checkInicialDenuncia(status)}
          </Avatar>
        }
        title={titulo}
      />
      <Link to={imagen} target="_blank" rel="noopener noreferrer">
        <CardMedia component="img" height="194" image={imagen} alt="deafult" />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {descripcion}
        </Typography>
        <Typography
          variant="body"
          color="text.secondary"
          sx={{ fontWeight: "bold" }}
        >
          Minutos de penalidad: {pena === "" ? 0 : pena}
        </Typography>
      </CardContent>
      <CardActions>
        <CardActionArea onClick={() => setShowBotones(!showBotones)}>
          {status === 0 && (
            <Typography size="small" color="orange">
              Pendiente
            </Typography>
          )}
          {status === 1 && (
            <Typography size="small" color="red">
              Rechazada
            </Typography>
          )}
          {status === 2 && (
            <Typography size="small" color="green">
              Terminada
            </Typography>
          )}
        </CardActionArea>

        <CardActionArea>
          {autorizado === 0 && (
            <Typography size="small" color="orange" onClick={handleConfirm}>
              Pendiente de autorización
            </Typography>
          )}
          {autorizado === 1 && (
            <Typography size="small" color="success.main">
              Autorizado
            </Typography>
          )}
        </CardActionArea>
      </CardActions>

      {showSuccessAuto && <Alert severity="success">Operación exitosa.</Alert>}

      {autorizado !== 1 && (
        <Collapse in={showBotones} timeout="auto" unmountOnExit>
          <CardContent sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={(e) => handleChangeStatus(e, id, 1)}
            >
              Rechazar
            </Button>
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={(e) => handleChangeStatus(e, id, 2)}
            >
              Aceptar
            </Button>
          </CardContent>
        </Collapse>
      )}

      {showSuccess && <Alert severity="success">Operación exitosa.</Alert>}

      {confirmarAuto && (
        <ConfirmAutorizacion
          id={id}
          confirmarAuto={confirmarAuto}
          setConfirmarAuto={setConfirmarAuto}
          setShowSuccessAuto={setShowSuccessAuto}
        />
      )}
    </Card>
  );
}
