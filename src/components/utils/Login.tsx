import * as React from "react";
import type { Route } from "./+types/Login";
import { redirectDocument } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import NoAccountsIcon from "@mui/icons-material/NoAccounts";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Avatar from "@mui/material/Avatar";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const path = url.pathname;
  console.log("pathname is: %s", path);
  if (path === "/login") {
    console.log("redirecting...");
    return redirectDocument(
      "https://auth.kothis.sylphaxiom.com/authorize?response_type=code&client_id=nsCWH91VQeP8M9RQ6a4clk4xp6DsNkhB&redirect_uri=http://localhost:5173&scope=openid%20profile%20email&state="
    );
  }
}

export default function Login() {
  const { loginWithRedirect, logout } = useAuth0();
  const { isAuthenticated, user } = useAuth0();
  const [open, setOpen] = React.useState(false);

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
    console.log(clk);
    switch (clk) {
      case "Log In":
        await loginWithRedirect({
          appState: { returnTo: location.pathname },
        });
        break;
      case "Log Out":
        await logout();
        break;
      case "Sign Up":
        await loginWithRedirect({
          appState: { returnTo: "/notebook/profile" },
          authorizationParams: { screen_hint: "signup" },
        });
        break;
      default:
        console.log("Default reached, something probably went wrong.");
    }
  };

  return (
    <SpeedDial
      color={isAuthenticated ? "success" : "secondary"}
      ariaLabel="Login SpeedDial"
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
