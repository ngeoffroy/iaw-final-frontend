import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { changeAutorizado } from "../../utils/loaders";

export default function ConfirmAutorizacion({
  id,
  confirmarAuto,
  setConfirmarAuto,
  setShowSuccessAuto,
}) {
  const handleClose = () => {
    setConfirmarAuto(false);
  };

  const handleChangeAutorizado = async (event) => {
    event.preventDefault();
    let data = new FormData();
    data["id"] = id;
    data["autorizado"] = 1;
    let response = await changeAutorizado(data);
    if ((response.status = 200)) {
      setShowSuccessAuto(true);
      handleClose();
      setTimeout(() => {
        setShowSuccessAuto(false);
      }, 3000);
    } else {
      alert("Error en el cambio de autorizado ...");
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={confirmarAuto}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Autorizar denuncia"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Seguro que deseas autorizar la denuncia número {id}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleChangeAutorizado} autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
