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
import { type AuthAction, useAuthActions } from "./useAuthActions";

export default function Login() {
  const { isAuthenticated, user } = useAuth0();
  const [open, setOpen] = React.useState(false);
  const domain = "http://localhost:5173";
  const handleAuthAction = useAuthActions(domain);

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

  const handleLogin = (_e: React.MouseEvent, clk: string) => {
    handleAuthAction(clk as AuthAction);
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
