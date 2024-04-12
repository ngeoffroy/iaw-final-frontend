import * as React from "react";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import Alert from "@mui/material/Alert";

export default function LogoutAlert() {
  return (
    <Alert icon={<WavingHandIcon fontSize="inherit" />} severity="success">
      Sesión finalizada. Vuelva pronto!!
    </Alert>
  );
}
