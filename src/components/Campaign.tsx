import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicCampaign from "./nonAuth/PublicCampaign";

export async function clientLoader() {
  // World page loader
}

export default function Campaign() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        {isAuthenticated ? user?.name + "\'s " : "The Public\'s "} Campaign Page
      </Typography>
      {isAuthenticated ? <Outlet /> : <PublicCampaign />}
    </>
  );
}
