import { useAuth0 } from "@auth0/auth0-react";
import CloseIcon from "@mui/icons-material/Close";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import Avatar from "@mui/material/Avatar";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import * as React from "react";
import { redirectDocument, useLocation, useNavigate } from "react-router";
import type { Route } from "./+types/Login";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const path = url.pathname;
  if (path === "/login") {
    console.log("redirecting...");
    return redirectDocument(
      "https://auth.kothis.sylphaxiom.com/authorize?audience=https://dev-t7637rzyxd0qsbu0.us.auth0.com/api/v2/&response_type=code&scope=openid%20profile%20email%20offline_access&client_id=nsCWH91VQeP8M9RQ6a4clk4xp6DsNkhB&redirect_uri=https://test.sylphaxiom.com/",
    );
  }
}

export default function Login() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const domain = "http://localhost:5173";

  const handleOpen = () => setOpen(false);
  const handleClose = () => setOpen(true);

  const unauthed = [
    { icon: <LoginIcon />, name: "Log In" },
    { icon: <HowToRegIcon />, name: "Sign Up" },
  ];
  const authed = [
    { icon: <LogoutIcon />, name: "Log Out" },
    { icon: <ManageAccountsIcon />, name: "Profile" },
  ];
  const actions = isAuthenticated ? authed : unauthed;

  const handleLogin = async (_e: React.MouseEvent, clk: string) => {
    switch (clk) {
      case "Log In":
        await loginWithRedirect({
          appState: { returnTo: domain + location.pathname },
        });
        break;
      case "Log Out":
        await logout({
          logoutParams: { returnTo: domain + "/" },
        });
        break;
      case "Sign Up":
        await loginWithRedirect({
          appState: { returnTo: domain + location.pathname },
          authorizationParams: { screen_hint: "signup" },
        });
        break;
      case "Profile":
        navigate("/notebook/profile");
        break;
      default:
    }
  };

  return (
    <SpeedDial
      ariaLabel="Login SpeedDial"
      FabProps={{ color: isAuthenticated ? "success" : "secondary" }}
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        transformOrigin: 0,
      }}
      icon={
        isAuthenticated ? (
          <SpeedDialIcon
            sx={{ height: "30px" }}
            color="success"
            icon={
              <Avatar
                sx={{ width: 30, height: 30, scale: 1.5 }}
                src={user?.picture}
              />
            }
            openIcon={
              <CloseIcon
                sx={{
                  display: "flex",
                  justifySelf: "center",
                  alignSelf: "baseline",
                }}
              />
            }
          />
        ) : (
          <SpeedDialIcon
            sx={{ height: "30px" }}
            color="secondary"
            icon={<NoAccountsIcon />}
            openIcon={<CloseIcon />}
          />
        )
      }
      onClose={handleOpen}
      onOpen={handleClose}
      open={open}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          slotProps={{
            tooltip: {
              title: action.name,
              "aria-label": action.name,
            },
            staticTooltipLabel: {
              sx: {
                textWrap: "nowrap",
              },
            },
          }}
          onClick={(e: React.MouseEvent) => {
            handleLogin(e, action.name);
          }}
        />
      ))}
    </SpeedDial>
  );
}
