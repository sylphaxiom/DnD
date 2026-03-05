import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicWorld from "./nonAuth/PublicWorld";
import type { Route } from "./+types/World";
import Loading from "./Loading";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayer } from "./workhorse/Queries";

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

export default function World() {
  const { user, isAuthenticated } = useAuth0();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getPlayer", user?.preferred_username, user?.email],
    queryFn: () =>
      fetchPlayer(isAuthenticated, user?.preferred_username, user?.email),
  });
  const player = data?.message[0];

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
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        {isAuthenticated ? player?.first_name + "\'s " : "The Public\'s "} World
        Page
      </Typography>
      {isAuthenticated ? <Outlet /> : <PublicWorld />}
    </>
  );
}
