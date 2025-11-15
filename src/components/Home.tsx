// import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "./Loading";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Player {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  role: string;
  prefs?: string[];
}

async function fetchPlayer(
  username?: string,
  email?: string
): Promise<{
  status: string;
  message: Player;
}> {
  const response = await axios
    .get(`https://kothis.sylphaxiom.com/api/v1/player.php`, {
      headers: {
        Sage: "wVizRhmx0Ufhr8k3xvTQh5kQK2HDqXb3xdbjdawlxXiYiYWcw2YTTWoYMIVjtIH6",
      },
      params: { username: username, email: email },
    })
    .catch((error) => {
      console.log("An error occurred: %s", error);
      throw error;
    });
  return response.data;
}

export async function clientLoader() {}

export default function Home() {
  const { user } = useAuth0();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getPlayer", user?.preferred_username, user?.email],
    queryFn: () => fetchPlayer(user?.preferred_username, user?.email),
  });
  const fname = data?.message.first_name;
  const lname = data?.message.last_name;
  const uname = data?.message.username;
  const email = data?.message.email;
  const role = data?.message.role;
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
  }
  return (
    <Box>
      <Typography variant="h3">Welcome {fname + " " + lname}</Typography>
      <Typography variant="h6">I also know your username is {uname}</Typography>
      <Typography variant="h3">your email address is {email}</Typography>
      <Typography variant="h6">
        and the role you're assigned is {role}
      </Typography>
    </Box>
  );
}
