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
import Grow from "@mui/material/Grow";

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

  return (
    <Grid container spacing={1}>
      <Typography variant="h3" sx={{ textAlign: "center", width: 1, py: 3 }}>
        The Lore of Kothis and worlds beyond...
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
      <Grid size={{ xs: 12 }} sx={{ mx: 3, mt: 3 }}>
        <Typography variant="body1">
          What do we want to look at today?
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ mx: 3, mt: 3 }}>
        <FormControl variant="standard" sx={{ width: { xs: 1 } }}>
          <InputLabel id="search-topic-label">Topic</InputLabel>
          <Select
            labelId="search-topic-label"
            id="search-topic"
            value={filterState.topic}
            onChange={(e) =>
              dispatch({ type: "SET_TOPIC", payload: e.target.value as string })
            }
            label="Topic"
          >
            <MenuItem value="items">Items</MenuItem>
            <MenuItem value="magicItems">Magic Items</MenuItem>
            <MenuItem value="spells">Spells</MenuItem>
            <MenuItem value="species">Species</MenuItem>
            <MenuItem value="classes">Classes</MenuItem>
            <MenuItem value="weapons">Weapons</MenuItem>
            <MenuItem value="armor">Armor</MenuItem>
            <MenuItem value="backgrounds">Backgrounds</MenuItem>
            <MenuItem value="feats">Feats</MenuItem>
            <MenuItem value="creatures">Creatures</MenuItem>
            <MenuItem value="conditions">Conditions</MenuItem>
            <MenuItem value="abilities">Abilities</MenuItem>
            <MenuItem value="skills">Skills</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ mx: 1, mt: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={filtered}
              onChange={(e) => setFiltered(e.target.checked)}
              sx={{ mx: 3 }}
            />
          }
          sx={{ width: 1, justifyContent: "space-between" }}
          label="Any filters?"
          labelPlacement="start"
        />
      </Grid>
      <Grow in={filtered} unmountOnExit>
        <Paper variant="elevation" elevation={10} sx={{ m: 3, p: 3 }}>
          <Filters filterState={filterState} dispatch={dispatch} />
        </Paper>
      </Grow>
    </Grid>
  );
}
