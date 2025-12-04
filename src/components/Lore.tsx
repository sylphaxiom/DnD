import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicLore from "./nonAuth/PublicLore";

export async function clientLoader() {
  // World page loader
}

export default function Lore() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        {isAuthenticated ? user?.name + "\'s " : "The Public\'s "} Lore Page
      </Typography>
      {isAuthenticated ? <Outlet /> : <PublicLore />}
    </>
  );
}
