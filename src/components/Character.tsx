import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicCharacter from "./nonAuth/PublicCharacter";
import type { Route } from "./+types/Character";

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

export default function Character() {
  const { isAuthenticated, user } = useAuth0();
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        {isAuthenticated ? user?.name + "\'s " : "The Public\'s "} Character
        Page
      </Typography>
      {isAuthenticated ? <Outlet /> : <PublicCharacter />}
    </>
  );
}
