import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicCampaign from "./nonAuth/PublicCampaign";
import type { Route } from "./+types/Campaign";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const query = decodeURIComponent(url.search);
  const bits = query.slice(1).split("&");
  let params: { [key: string]: string } = {};
  bits.forEach((v) => {
    const pair = v.split("=");
    params[pair[0]] = pair[1];
  });
  return params;
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
