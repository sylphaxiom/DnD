import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import PublicHome from "./nonAuth/PublicHome";
import Thinking from "./utils/Thinking";
import { fetchPlayer } from "./workhorse/Queries";

export { searchParamsLoader as clientLoader } from "./utils/searchParams";

export default function Landing() {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getPlayer", user?.preferred_username, user?.email],
    queryFn: () =>
      fetchPlayer(
        isAuthenticated,
        getAccessTokenSilently,
        user?.preferred_username,
        user?.email,
      ),
  });
  if (isAuthenticated) {
    if (isLoading) {
      return <Thinking />;
    }
    if (error) {
      console.log(
        "Something went wrong here.\nError message: %s\nReturned Data: %s",
        JSON.stringify(error.message),
        JSON.stringify(data),
      );
    }
  }
  return isAuthenticated ? <Outlet /> : <PublicHome />;
}
