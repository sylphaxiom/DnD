import { useAuth0 } from "@auth0/auth0-react";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import ModeSwitch from "../utils/ModeSwitch";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Title from "./Title";
import Utils from "./Utils";
interface bps {
  sm: boolean;
  md: boolean;
  lg: boolean;
  xl: boolean;
}

export default function Layout() {
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleAcct = () => {
    handleClose();
    navigate("/notebook/profile");
  };

  const domain = "http://localhost:5173";

  const handleLogin = (_e: React.MouseEvent, clk: string) => {
    switch (clk) {
      case "Log In":
        handleClose();
        loginWithRedirect({
          appState: { returnTo: domain + location.pathname },
        });
        break;
      case "Log Out":
        handleClose();
        localStorage.clear();
        logout({ logoutParams: { returnTo: domain + location.pathname } });
        break;
      case "Sign Up":
        handleClose();
        loginWithRedirect({
          appState: { returnTo: domain + location.pathname },
          authorizationParams: { screen_hint: "signup" },
        });
        break;
      default:
    }
  };

  let bps: bps = {
    sm: useMediaQuery("(min-width: 600px)"),
    md: useMediaQuery("(min-width: 900px)"),
    lg: useMediaQuery("(min-width: 1200px)"),
    xl: useMediaQuery("(min-width: 1536px)"),
  };

  const bits = location.pathname.split("/");
  let page = "";
  bits.forEach((bit, i, bits) => {
    if (bits.length > 3) {
      if (i === 1 || i === bits.length - 1) {
        page += bit.charAt(0).toUpperCase() + bit.substring(1);
      } else {
        page += " . ";
      }
    } else {
      if (bit !== "") {
        page +=
          (i === 1 ? "" : " > ") +
          bit.charAt(0).toUpperCase() +
          bit.substring(1);
      }
    }
  });

  return (
    <>
      {bps.lg ? (
        <Box
          sx={{
            height: "100%",
            width: 1,
            paddingLeft: { lg: "15vw", xl: "0" },
            paddingRight: { lg: "5vw", xl: "0" },
          }}
        >
          <Container id="cont-main">
            <Navbar bps={bps} />
            <Title />
            <Outlet />
            <Utils />
          </Container>
          <Footer />
        </Box>
      ) : (
        <Box>
          <AppBar id="navHead" sx={{ width: 1 }} position="sticky">
            <Toolbar>
              <Navbar bps={bps} />
              <Typography
                variant="h5"
                className="primary"
                component="div"
                sx={{ flexGrow: 1 }}
              >
                Kothis Portal<span style={{ float: "right" }}>{page}</span>
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color={isAuthenticated ? "success" : "secondary"}
                sx={{ mr: 4 }}
              >
                {isAuthenticated ? (
                  <Avatar src={user?.picture} />
                ) : (
                  <NoAccountsIcon />
                )}
              </IconButton>
              <ModeSwitch />
              {isAuthenticated ? (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  disableScrollLock
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={(e: React.MouseEvent) => {
                      handleLogin(e, "Log Out");
                    }}
                  >
                    Log Out
                  </MenuItem>
                  <MenuItem onClick={handleAcct}>Profile</MenuItem>
                </Menu>
              ) : (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  disableScrollLock
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
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
                  <MenuItem
                    onClick={(e: React.MouseEvent) => {
                      handleLogin(e, "Sign Up");
                    }}
                  >
                    Sign Up
                  </MenuItem>
                </Menu>
              )}
            </Toolbar>
          </AppBar>
          <Outlet />
          <Footer />
        </Box>
      )}
    </>
  );
}
