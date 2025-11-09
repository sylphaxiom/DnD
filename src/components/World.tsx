import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicWorld from "./world/PublicWorld";
import { AuthGuard } from "./layouts/AuthGuard";

export async function clientLoader() {
  // World page loader
}

export default function World() {
  const { isAuthenticated } = useAuth0();
  const GuardedRoute = AuthGuard(Outlet);
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        The World of Kothis
      </Typography>
      {isAuthenticated ? <GuardedRoute /> : <PublicWorld />}
    </>
  );
}
