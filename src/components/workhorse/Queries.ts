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
    return <Thinking />;
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
  | "Origin"
  | "Fighting Style"
  | "Epic Boon"
}

export interface FeatPrereq {
  prerequisite: string;
}

export async function fetchFtPrereqs(): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: FeatPrereq[]
  } | null> {
    const response = await axios
      .get(`https://api.open5e.com/v2/feats`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          ordering: "prerequisite",
          limit: 1000,
          fields: "prerequisite",
        },
      })
      .catch((error) => {
        console.log("An error occurred fetching Feats: %s", error);
        throw error;
      });
    return response.data;
}


export async function fetchFeats(
  name: string = "",
  document_key: string[] = [],
  exact: boolean = false,
  featType: string[] = [],
  prereqs: string[] = [],
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
    const response = await axios
      .get(`https://api.open5e.com/v2/feats`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          name__iexact: name__iexact,
          name__icontains: name__icontains,
          document__gamesystem__key__in: documents,
          limit: featType.length > 0 || prereqs.length > 0 ? 10000 : limit,
          page: featType.length > 0 || prereqs.length > 0 ? 1 : page,
          ordering: ordering,
          key: key,
        },
      })
      .then((response) => {
        let Filtered: typeof response.data = []
        if (featType.length > 0 || prereqs.length > 0) {
          Filtered.push(...response.data.results.filter((feat: Feat) => featType.includes(feat.type) || prereqs.includes(feat.prerequisite)))
          // Filtered.push(...response.data.results.filter((feat: Feat) => prereqs.includes(feat.prerequisite)))
          let totalLength = Filtered.length
          console.log("Feats fetched: %i", totalLength);
          if (Filtered.length > limit) {
            totalLength = Filtered.length
            const start = (page - 1) * limit
            const end = start + limit
            Filtered = Filtered.slice(start, end)
            console.log("Fitered feats returned: %i", Filtered.length);
          }
          return {...response.data, results: Filtered, count: totalLength}
        } else {
          return response.data;
        }
      })
      .catch((error) => {
        console.log("An error occurred fetching Feats: %s", error);
        throw error;
      });
    return response;
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

export interface Reference {
  key:string;
  licenses: {
    name:string;
    key:string;
  }[];
  publisher:{
    name:string;
    key:string;
  };
  gamesystem:{
    name:string;
    key:string;
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
  name: string = "",
  document_key: string[] = [],
  exact: boolean = false,
  publisher: string[] = [],
  license: string[] = [],
  limit: number = 20,
  page: number = 1,
  ordering: string = "name",
  key: string = "",
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Reference[]
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
    const params = new URLSearchParams();
    params.append("name__iexact", name__iexact);
    params.append("name__icontains", name__icontains);
    params.append("document__gamesystem__key__in", documents);
    publisher.forEach((pub) => params.append("publisher", pub));
    license.forEach((lic) => params.append("licenses", lic));
    params.append("limit", String(limit));
    params.append("page", String(page));
    params.append("ordering", ordering);
    params.append("key", key);
    params.append("exclude", "type,distance_unit,weight_unit");
    console.log("Publisher and license are: %o | %o",publisher,license)
    console.log("Full params are: %s", params.toString())
    const response = await axios
      .get(`https://api.open5e.com/v2/documents`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: params
      })
      .catch((error) => {
        console.log("An error occurred fetching References: %s", error);
        throw error;
      });
      console.log("References fetched: %i", response.data.count);
      console.log("Query is: %o", response.request)
    return response.data;
}

export interface License {
  key:string;
  name:string;
  desc:string; // MD
}

export async function fetchLicenses(): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: License[]
  } | null> {
    const response = await axios
      .get(`https://api.open5e.com/v2/licenses`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          limit: 10000,
        },
      })
      .catch((error) => {
        console.log("An error occurred fetching Licenses: %s", error);
        throw error;
      });
      console.log("Licenses fetched: %i", response.data.count);
    return response.data;
}

export interface Publisher {
  key:string;
  name:string;
}

export async function fetchPublishers(): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Publisher[]
  } | null> {
    const response = await axios
      .get(`https://api.open5e.com/v2/publishers`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          limit: 10000,
        },
      })
      .catch((error) => {
        console.log("An error occurred fetching Publishers: %s", error);
        throw error;
      });
      console.log("Publishers fetched: %i", response.data.count);
    return response.data;
}

export interface Trait {
  name:string;
  desc:string;
  type: string | null;
  order: number;
}

export interface Species {
  key:string;
  is_subspecies:boolean;
  document: DocumentSummary;
  traits: Trait[];
  name: string;
  desc: string; //MD
  subspecies_of: string;
}

export type HasSubspecies =
  | "unknown"
  | "true"
  | "false"

// Species
export async function fetchSpecies(
  name: string = "",
  document_key: string[] = [],
  exact: boolean = false,
  hasSubspecies: HasSubspecies = "unknown",
  subspecies_of: string[],
  _limit: number = 20,
  _page: number = 1,
  ordering: string = "name",
  key: string = "",
): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Species[]
  } | null> {
    let name__iexact = ""
    let name__icontains = ""
    if (exact) {
      name__iexact = name
    } else {
      name__icontains = name
    }
    let documents = ""
    let subspecies_list = ""
    document_key.map((key)=>{documents += (key+",")})
    subspecies_of.map((key)=>{subspecies_list += (key+",")})
    const response = await axios
      .get(`https://api.open5e.com/v2/species`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          name__iexact: name__iexact,
          name__icontains: name__icontains,
          document__gamesystem__key__in: documents,
          subspecies_of__isnull: hasSubspecies,
          subspecies_of__key__in: subspecies_list,
          limit: 10000,
          ordering: ordering,
          key: key,
        },
      })
      .catch((error) => {
        console.log("An error occurred fetching Species: %s", error);
        throw error;
      });
      console.log("Species fetched: %i", response.data.count);
    return response.data;
}

export async function fetchAllSpecies(): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Species[]
  } | null> {
    const response = await axios
      .get(`https://api.open5e.com/v2/species`, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          limit: 10000,
        },
      })
      .catch((error) => {
        console.log("An error occurred fetching Subspecies: %s", error);
        throw error;
      });
      console.log("Subspecies fetched: %i", response.data.count);
    return response.data;
}