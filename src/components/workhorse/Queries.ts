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
  } else return null;
}

/* ^^^ Implementation ^^^ */
/*
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

export interface GameSystem {
  url:string;
  key:string;
  name:string;
  desc:string;
  content_prefix:string;
}

export async function fetchGameSystems(): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: GameSystem[]
  } | null> {
    const response = await axios
      .get(`https://api.open5e.com/v2/gamesystems`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .catch((error) => {
        console.log("An error occurred: %s", error);
        throw error;
      });
    return response.data;
}


export interface Background {
  url:string;
  key:string;
  benefits:{
    name:string;
    desc:string;
    type:
    | "ability_score"
    | "skill_proficiency"
    | "tool_proficiency"
    | "language"
    | "equipment"
    | "feature"
    | "feat"
    | "suggested_characteristics"
    | "adventures_and_advancement"
    | "connection_and_memento"
    | ""
    | null
  }[];
  document:{
    name:string;
    key:string;
    type:string;
    display_name:string;
    publisher:{
      name:string;
      key:string;
      url:string;
    };
    gamesystem:{
      name:string;
      key:string;
      url:string;
    };
    permalink:string;
  }
  name:string;
  desc:string;
  content_prefix:string;
}

export async function fetchBackgrounds(
  name__iexact: string = "",
  name__icontains: string = "",
  document__gamesystem__key: string = "",
  key: string = "",
  order: string = "",
  search: string = "",
  page: number = 1,
  limit: number = 20
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Background[]
  } | null> {
    const response = await axios
      .get(`https://api.open5e.com/v2/backgrounds`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          name__iexact: name__iexact,
          name__icontains: name__icontains,
          document__gamesystem__key: document__gamesystem__key,
          key: key,
          order: order,
          search: search,
          page: page,
          limit: limit,
        },
      })
      .catch((error) => {
        console.log("An error occurred: %s", error);
        throw error;
      });
      console.log("Backgrounds fetched: %i", response.data.count);
    return response.data;
}