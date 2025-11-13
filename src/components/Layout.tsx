import * as React from "react";
import Box from "@mui/material/Box";
import Title from "./layouts/Title";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { Outlet, useNavigate } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import Utils from "./layouts/Utils";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  // const { isLoading, isAuthenticated } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { loginWithRedirect, logout } = useAuth0();
  const navigate = useNavigate();
  // const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAcct = () => {
    navigate("/notebook/profile");
  };

  const handleLogin = (_e: React.MouseEvent, clk: string) => {
    console.log(clk);
    switch (clk) {
      case "Log In":
        loginWithRedirect({
          appState: { returnTo: location.pathname },
        });
        break;
      case "Log Out":
        logout();
        break;
      case "Sign Up":
        loginWithRedirect({
          appState: { returnTo: "/notebook/profile" },
          authorizationParams: { screen_hint: "signup" },
        });
        break;
      default:
        console.log("Default reached, something probably went wrong.");
    }
  };

  let bps = {
    sm: useMediaQuery("(min-width: 600px)"),
    md: useMediaQuery("(min-width: 900px)"),
    lg: useMediaQuery("(min-width: 1200px)"),
    xl: useMediaQuery("(min-width: 1536px)"),
  };

  return (
    <>
      {bps.lg ? (
        <Box sx={{ height: "100%", width: 1, mx: "auto" }}>
          <Container id="cont-main" sx={{ ml: "15vw" }}>
            <Navbar bps={bps} />
            <Title />
            <Outlet />
            <Utils />
          </Container>
          <Footer />
        </Box>
      ) : (
        <>
          <AppBar position="sticky">
            <Toolbar>
              <Navbar bps={bps} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Kothis Portal
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={(e: React.MouseEvent) => {
                    handleLogin(e, "Log In");
                  }}
                >
                  Log In
                </MenuItem>
                <MenuItem onClick={handleAcct}>My account</MenuItem>
              </Menu>
            </Toolbar>
          </AppBar>
          <Outlet />
        </>
      )}
    </>
  );
}
