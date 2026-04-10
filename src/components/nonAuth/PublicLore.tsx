import * as React from "react";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Filters from "../forms/Filters";
import Paper from "@mui/material/Paper";
import { Button, Collapse } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import {
  fetchBackgrounds,
  fetchFeats,
  fetchRules,
  fetchReferences,
} from "../workhorse/Queries";
import Loading from "../utils/Loading";
import Nothing from "../utils/Nothing";

interface FilterState {
  magical: boolean;
  gamesystem: string;
  nameCont: string;
  descCont: string;
  costVal: boolean;
  value: number[];
  costValue: number;
}

type FilterAction =
  | { type: "SET_MAGICAL"; payload: boolean }
  | { type: "SET_GAMESYSTEM"; payload: string }
  | { type: "SET_NAME_CONT"; payload: string }
  | { type: "SET_DESC_CONT"; payload: string }
  | { type: "SET_COST_VAL"; payload: boolean }
  | { type: "SET_VALUE"; payload: number[] }
  | { type: "SET_COST_VALUE"; payload: number };

const initialFilterState: FilterState = {
  magical: false,
  gamesystem: "",
  nameCont: "",
  descCont: "",
  costVal: true,
  value: [500, 9000],
  costValue: 1000,
};

function filterReducer(state: FilterState, action: FilterAction): FilterState {
  switch (action.type) {
    case "SET_MAGICAL":
      return { ...state, magical: action.payload };
    case "SET_GAMESYSTEM":
      return { ...state, gamesystem: action.payload };
    case "SET_NAME_CONT":
      return { ...state, nameCont: action.payload };
    case "SET_DESC_CONT":
      return { ...state, descCont: action.payload };
    case "SET_COST_VAL":
      return { ...state, costVal: action.payload };
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "SET_COST_VALUE":
      return { ...state, costValue: action.payload };
    default:
      return state;
  }
}

export async function clientLoader() {
  // Lore page loader
}

export default function PublicLore() {
  const [filterState, dispatch] = React.useReducer(
    filterReducer,
    initialFilterState,
  );
  const [filtered, setFiltered] = React.useState(false);
  const [topic, setTopic] = React.useState<
    | ""
    | "spells"
    | "items"
    | "species"
    | "classes"
    | "backgrounds"
    | "feats"
    | "creatures"
    | "rules"
    | "lookup"
    | "references"
  >("");
  const display = topic === "" ? "none" : "flex";
  let query: any;
  const qBackgrounds = useQuery({
    queryKey: ["fetchBackgrounds"],
    queryFn: () => fetchBackgrounds(),
    enabled: false,
  });
  if (topic === "backgrounds") {
    query = qBackgrounds;
  }
  const qFeats = useQuery({
    queryKey: ["fetchFeats"],
    queryFn: () => fetchFeats(),
    enabled: false,
  });
  if (topic === "feats") {
    query = qFeats;
  }
  const qRules = useQuery({
    queryKey: ["fetchRules"],
    queryFn: () => fetchRules(),
    enabled: false,
  });
  if (topic === "rules") {
    query = qRules;
  }
  const qReferences = useQuery({
    queryKey: ["fetchReferences"],
    queryFn: () => fetchReferences(),
    enabled: false,
  });
  if (topic === "references") {
    query = qReferences;
  }
  const { isLoading, data, error, refetch } = query || {};
  const results = query?.data?.results || [];
  // const backgrounds: Background[] | undefined = data?.results;

  if (error) {
    console.log(
      "Something went wrong here.\nError message: %s\nReturned Data: %s",
      JSON.stringify(error.message),
      JSON.stringify(data),
    );
  }

  return (
    <Grid container spacing={1}>
      <Typography variant="h3" sx={{ textAlign: "center", width: 1, py: 3 }}>
        The Lore of Kothis and Worlds Beyond...
      </Typography>
      <Typography
        variant="h6"
        sx={{ textAlign: "center", width: 0.8, mx: "auto", my: 4 }}
      >
        With a special thanks to{" "}
        <Link
          href="https://open5e.com/"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          color="secondary"
        >
          Open5e
        </Link>
        {", "} I can provide the entirety of the 5e SRD and other content
        covered by the OGL! Be patient with my UI as I work to integrate this
        API into the site.
      </Typography>
      <Divider variant="middle" sx={{ my: 4, width: 0.9, mx: "auto" }} />
      <Grid size={{ xs: 12 }} sx={{ px: 3, mt: 3 }}>
        <Typography variant="body1">
          What do we want to look at today?
        </Typography>
      </Grid>
      {/* <div style={{ width: "100%" }}> */}
      <Grid size={12} sx={{ px: 3, mt: 3 }}>
        <FormControl variant="standard" sx={{ width: { xs: 1 } }}>
          <InputLabel id="search-topic-label">Topic</InputLabel>
          <Select
            labelId="search-topic-label"
            id="search-topic"
            value={topic}
            onChange={(e) =>
              setTopic((e.target.value as string) ? e.target.value : "")
            }
            label="Topic"
          >
            <MenuItem value="">Select a topic...</MenuItem>
            <MenuItem value="spells" disabled>
              Spells
            </MenuItem>
            <MenuItem value="items" disabled>
              Items
            </MenuItem>
            <MenuItem value="species" disabled>
              Species
            </MenuItem>
            <MenuItem value="classes" disabled>
              Classes
            </MenuItem>
            <MenuItem value="backgrounds">Backgrounds</MenuItem>
            <MenuItem value="feats">Feats</MenuItem>
            <MenuItem value="creatures" disabled>
              Creatures
            </MenuItem>
            <MenuItem value="rules">Rules</MenuItem>
            <MenuItem value="lookup">Lookup Lists</MenuItem>
            <MenuItem value="references">References</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 2, width: 1 }}
          onClick={() => {
            refetch();
          }}
        >
          Search
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ px: 1, mt: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={filtered}
              onChange={(e) => setFiltered(e.target.checked)}
              sx={{ mx: 3 }}
            />
          }
          sx={{ width: 1, justifyContent: "space-between", display: display }}
          label="Any filters?"
          labelPlacement="start"
        />
      </Grid>
      <Grid size={12}>
        <Collapse orientation="vertical" sx={{ mx: 3 }} in={filtered}>
          <Paper
            variant="elevation"
            elevation={10}
            sx={{
              width: 1,
            }}
          >
            <Filters
              filterState={filterState}
              dispatch={dispatch}
              topic={topic}
            />
          </Paper>
        </Collapse>
      </Grid>
      <Grid size={12}>
        <Paper variant="elevation" elevation={10} sx={{ m: 3, py: 3 }}>
          {isLoading ? (
            <Loading />
          ) : results && results.length > 0 ? (
            results?.map((item: any) => <div key={item.key}>{item.name}</div>)
          ) : (
            <Nothing />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
