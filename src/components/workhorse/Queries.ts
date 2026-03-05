import axios from "axios";

export interface Player {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  role: string;
  prefs?: string;
}

export async function fetchPlayer(
  isAuthenticated: boolean,
  username?: string,
  email?: string,
): Promise<{
  status: string;
  message: Player[];
} | null> {
  if(isAuthenticated){
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
  } else return null
}

/* ^^^ Implementation ^^^ */
/*
  const { user } = useAuth0();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getPlayer", user?.preferred_username, user?.email],
    queryFn: () => fetchPlayer(isAuthenticated, user?.preferred_username, user?.email),
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
/**************************/