// import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";
import { fetchPlayer } from "./calls/Queries";
import { useQuery } from "@tanstack/react-query";

export async function clientLoader() {}

export default function Home() {
  const { user } = useAuth0();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getPlayer", user?.preferred_username, user?.email],
    queryFn: () => fetchPlayer(user?.preferred_username, user?.email),
  });
  const player = data?.message[0];
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.log(JSON.stringify(error));
  }
  return (
    <Box>
      <Typography variant="h3">
        Welcome {player?.first_name + " " + player?.last_name}
      </Typography>
      <Typography variant="h6">
        I also know your username is {player?.username}
      </Typography>
      <Typography variant="h3">
        your email address is {player?.email}
      </Typography>
      <Typography variant="h6">
        and the role you're assigned is {player?.role}
      </Typography>
    </Box>
  );
}
