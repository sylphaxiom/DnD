import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Outlet } from "react-router";
import PublicHomebrew from "./nonAuth/PublicHomebrew";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayer } from "./calls/Queries";
import Loading from "./Loading";

export default function Homebrew() {
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
      console.log(JSON.stringify(error));
    }
  }
  const player = data?.message[0];
  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        {isAuthenticated
          ? player?.username + "\'s Homebrew Vault"
          : "The Public Homebrewery"}
      </Typography>
      {isAuthenticated ? <Outlet /> : <PublicHomebrew />}
    </>
  );
}
