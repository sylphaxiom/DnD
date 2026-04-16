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
        console.log("An error occurred fetching Player: %s", error);
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
  key:string;
  name:string;
  desc:string;
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
        params: {
          exclude: "content_prefix"
        }
      })
      .catch((error) => {
        console.log("An error occurred fetching Game Systems: %s", error);
        throw error;
      });
    return response.data;
}

export interface DocumentSummary {
    name:string;
    key:string;
    type:string;
    display_name:string;
    publisher:{
      name:string;
      key:string;
    };
    gamesystem:{
      name:string;
      key:string;
    };
    permalink:string;
  }

export interface BackgroundBenefit {
    name:string;
    desc:string | null;
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
  }

// Backgrounds
export interface Background {
  key:string;
  benefits:BackgroundBenefit[];
  document: DocumentSummary;
  name:string;
  desc:string;
}

export async function fetchBackgrounds(
  name: string = "",
  document_key: string[] = [],
  exact: boolean = false,
  limit: number = 20,
  page: number = 1,
  ordering: string = "name",
  key: string = "",
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Background[]
  } | null> {
    let name__iexact = ""
    let name__icontains = ""
    if (exact) {
      name__iexact = name
    } else {
      name__icontains = name
    }
    let documents = ""
    document_key.map((key)=>{documents += (key+",")})
    console.log("input values are:\ndocument_key: %o | document_string: %s", document_key, documents)
    const response = await axios
      .get(`https://api.open5e.com/v2/backgrounds`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          name__iexact: name__iexact,
          name__icontains: name__icontains,
          document__gamesystem__key__in: documents,
          limit: limit,
          page: page,
          ordering: ordering,
          key: key,
        },
      })
      .catch((error) => {
        console.log("An error occurred fetching Backgrounds: %s", error);
        throw error;
      });
      console.log("Backgrounds fetched: %i", response.data.count);
    return response.data;
}

export interface FeatBenefit {
  desc:string;
}

// Feats
export interface Feat {
  key:string;
  has_prerequisite:boolean;
  benefits:FeatBenefit[];
  document:DocumentSummary;
  name:string;
  desc:string;
  prerequisite:string;
  type:
  | "GENERAL"
  | "ORIGIN"
  | "FIGHTING_STYLE"
  | "EPIC_BOON"
}


export async function fetchFeats(
  name: string = "",
  document_key: string[] = [],
  exact: boolean = false,
  limit: number = 20,
  page: number = 1,
  ordering: string = "name",
  key: string = "",
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Feat[]
  } | null> {
    let name__iexact = ""
    let name__icontains = ""
    if (exact) {
      name__iexact = name
    } else {
      name__icontains = name
    }
    let documents = ""
    document_key.map((key)=>{documents += (key+",")})
    console.log("input values are:\ndocument_key: %o | document_string: %s", document_key, documents)
    const response = await axios
      .get(`https://api.open5e.com/v2/feats`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          name__iexact: name__iexact,
          name__icontains: name__icontains,
          document__gamesystem__key__in: documents,
          limit: limit,
          page: page,
          ordering: ordering,
          key: key,
        },
      })
      .catch((error) => {
        console.log("An error occurred fetching Feats: %s", error);
        throw error;
      });
      console.log("Feats fetched: %i", response.data.count);
    return response.data;
}

export interface Rule {
  key:string;
  name:string;
  desc:string;
  index:number;
  initialHeaderLevel:
  | 1
  | 2
  | 3
  | 4
  | 5
  document:string;
  ruleset:string;
}

export interface Ruleset {
  name:string;
  key:string;
  document: DocumentSummary
  desc:string;
  rules:Rule[];
}

// Rules
export async function fetchRules(
  name: string = "",
  document_key: string[] = [],
  exact: boolean = false,
  limit: number = 20,
  page: number = 1,
  ordering: string = "name",
  key: string = "",
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Rule[]
  } | null> {
    let name__iexact = ""
    let name__icontains = ""
    if (exact) {
      name__iexact = name
    } else {
      name__icontains = name
    }
    let documents = ""
    document_key.map((key)=>{documents += (key+",")})
    console.log("input values are:\ndocument_key: %o | document_string: %s", document_key, documents)
    const response = await axios
      .get(`https://api.open5e.com/v2/rulesets`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          name__iexact: name__iexact,
          name__icontains: name__icontains,
          document__gamesystem__key__in: documents,
          limit: limit,
          page: page,
          ordering: ordering,
          key: key,
        },
      })
      .catch((error) => {
        console.log("An error occurred fetching Rules: %s", error);
        throw error;
      });
      console.log("Rules fetched: %i", response.data.count);
    return response.data;
}

export interface LicenseSummary {
  name:string;
  key:string;
  url:string;
}

// NOTE: weight_unit is NOT an error, that is how it is in the docs 4/10/2026
export interface Document {
  url:string;
  key:string;
  licenses: LicenseSummary;
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
  display_name:string;
  name:string;
  desc:string;
  type:
  | "SOURCE"
  | "MISC"
  author:string;
  publication_date:string | null;
  permalink:string;
  distance_unit:
  | "feet"
  | "miles"
  | ""
  | null
  weight_unit:
  | "feet"
  | "miles"
  | ""
  | null
}

// References
export async function fetchReferences(
  name__iexact: string = "",
  name__icontains: string = "",
  document_key: string = "",
  key: string = "",
  order: string = "",
  search: string = "",
  page: number = 1,
  limit: number = 20
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Document[]
  } | null> {
    const response = await axios
      .get(`https://api.open5e.com/v2/documents`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          name__iexact: name__iexact,
          name__icontains: name__icontains,
          document__gamesystem__key: document_key,
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