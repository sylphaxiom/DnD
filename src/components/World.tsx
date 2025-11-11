import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicWorld from "./nonAuth/PublicWorld";
import { AuthGuard } from "./layouts/AuthGuard";

export async function clientLoader() {
  // World page loader
}

export default function World() {
  const { isAuthenticated, user } = useAuth0();
  const GuardedRoute = AuthGuard(Outlet);
  console.log(JSON.stringify(user));
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        {isAuthenticated ? user?.name + "\'s " : "The Public\'s "} World Page
      </Typography>
      {isAuthenticated ? <GuardedRoute /> : <PublicWorld />}
    </>
  );
}
