import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicHomebrew from "./nonAuth/PublicHomebrew";

export async function clientLoader() {
  // World page loader
}

export default function Homebrew() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        {isAuthenticated ? user?.name + "\'s " : "The Public\'s "} Homebrew Page
      </Typography>
      {isAuthenticated ? <Outlet /> : <PublicHomebrew />}
    </>
  );
}
