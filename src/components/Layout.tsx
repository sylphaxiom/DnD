import * as React from "react";
import Box from "@mui/material/Box";
import Title from "./layouts/Title";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import { Outlet, useLocation, useNavigate } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import Utils from "./layouts/Utils";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "@mui/material/Avatar";
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
  // const domain = "https://test.sylphaxiom.com"
  // const domain = "https://kothis.sylphaxiom.com"

  const handleLogin = (_e: React.MouseEvent, clk: string) => {
    console.log(clk);
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
        console.log("Default reached, something probably went wrong.");
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
        <Box>
          <AppBar sx={{ width: 1 }} position="sticky">
            <Toolbar>
              <Navbar bps={bps} />
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Kothis Portal - <span style={{ float: "right" }}>{page}</span>
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleClick}
                color={isAuthenticated ? "success" : "secondary"}
              >
                {isAuthenticated ? (
                  <Avatar src={user?.picture} />
                ) : (
                  <NoAccountsIcon />
                )}
              </IconButton>
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
        </Box>
      )}
    </>
  );
}
