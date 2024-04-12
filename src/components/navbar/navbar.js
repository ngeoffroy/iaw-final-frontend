import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { postLogout } from "../../utils/loaders";
import { useNavigate } from "react-router-dom";
import LogoutAlert from "../alerts/logout";
import { Link } from "react-router-dom";

function Navbar(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    let response = await postLogout();
    if (response.status === 200) {
      setShowAlert(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ bgcolor: "#3C57A0" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Sistema de fotodenuncias
          </Typography>
          {showAlert && <LogoutAlert />}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Button sx={{ color: "#fff" }} component={Link} to="/denuncias">
              Denuncias
            </Button>
            <Button sx={{ color: "#fff" }} component={Link} to="/nuevadenuncia">
              {" "}
              + Denuncia{" "}
            </Button>
            <Button sx={{ color: "#fff" }} onClick={handleLogout}>
              Cerrar sesion
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
