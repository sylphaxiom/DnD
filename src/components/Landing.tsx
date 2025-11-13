import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicHome from "./nonAuth/PublicHome";
import { AuthGuard } from "./wrappers/AuthGuard";

export async function clientLoader() {
  // World page loader
}

export default function Landing() {
  const { isAuthenticated, user } = useAuth0();
  const GuardedRoute = AuthGuard(Outlet);
  console.log(JSON.stringify(user));
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        {isAuthenticated ? user?.name + "\'s " : "The Public "} Landing Page
      </Typography>
      {isAuthenticated ? <GuardedRoute /> : <PublicHome />}
    </>
  );
}
