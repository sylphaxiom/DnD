import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicHome from "./nonAuth/PublicHome";
import { fetchPlayer } from "./calls/Queries";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import type { Route } from "./+types/Landing";

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

export default function Landing() {
  const { isAuthenticated, user } = useAuth0();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getPlayer", user?.preferred_username, user?.email],
    queryFn: () =>
      fetchPlayer(isAuthenticated, user?.preferred_username, user?.email),
  });
  if (isAuthenticated) {
    if (isLoading) {
      return <Loading />;
    }
    if (error) {
      console.log(
        "Something went wrong here.\nError message: %s\nReturned Data: %s",
        JSON.stringify(error.message),
        JSON.stringify(data)
      );
    }
  }
  const player = data?.message[0];
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        {isAuthenticated
          ? `Welcome Back, ${player?.username}`
          : "The Public's Landing Page"}
      </Typography>
      {isAuthenticated ? <Outlet /> : <PublicHome />}
    </>
  );
}
