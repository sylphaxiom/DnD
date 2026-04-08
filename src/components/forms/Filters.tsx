import Grid from "@mui/material/Grid";
// import NumberSpinner from "../workhorse/NumberSpinner";
// import Slider from "@mui/material/Slider";
// import Switch from "@mui/material/Switch";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import { useQuery } from "@tanstack/react-query";
import { fetchGameSystems, type GameSystem } from "../workhorse/Queries";
import Tooltip from "@mui/material/Tooltip";

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

interface FilterProps {
  filterState: FilterState;
  dispatch: React.Dispatch<FilterAction>;
  topic:
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
    | "references";
}

export default function Filters({ filterState, dispatch, topic }: FilterProps) {
  console.log("Filters rendered with topic:", topic);
  const { magical, gamesystem, nameCont, descCont, costVal, value, costValue } =
    filterState;
  const { data, error } = useQuery({
    queryKey: ["getGamesystem"],
    queryFn: () => fetchGameSystems(),
  });
  const gameSystems = data?.results;
  if (error) {
    console.log(
      "Something went wrong here.\nError message: %s\nReturned Data: %s",
      JSON.stringify(error.message),
      JSON.stringify(data),
    );
  }

  // All can use order, search, page, limit

  // SPELLS: BASIC, classes, level, range, school, duration, concentration, verbal, somatic, material, material_consumed, casting_time
  // ITEMS: BASIC, desc, cost, weight, rarity, attunement, category, magic, weapon, armor, light, versatile, thown, finesse, two_handed
  // SPECIES: BASIC, subspecies_of__isnull, subspecies_of
  // CLASSES: BASIC, subclass_of, subclass?
  // + BACKGROUNDS: BASIC
  // + FEATS: BASIC
  // CREATURES: BASIC, size, category, subcategory, type, cr, ac, ability_score, saving_throw, skill_bonus, passive_perception
  // + RULES: BASIC
  // LOOKUP: - static no filter -
  // + REFERENCES: BASIC

  // Types:
  // Basic: name, document (gamesystem/source)
  const basicFilters = (
    <>
      <Grid size={{ xs: 12 }}>
        <TextField
          id="name-contains"
          label="Name Contains..."
          variant="standard"
          fullWidth
          value={nameCont}
          onChange={(e) =>
            dispatch({ type: "SET_NAME_CONT", payload: e.target.value })
          }
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: "100%" }}>
          <InputLabel id="gamesystem-label">Gamesystem</InputLabel>
          <Select
            labelId="gamesystem-label"
            id="gamesystem"
            value={gamesystem}
            onChange={(e) =>
              dispatch({
                type: "SET_GAMESYSTEM",
                payload: e.target.value as string,
              })
            }
            label="Gamesystem"
          >
            <MenuItem value="">Select a Game System...</MenuItem>
            {gameSystems?.map(({ key, name, desc }: GameSystem) => {
              return (
                <MenuItem value={key}>
                  <Tooltip title={desc} key={key}>
                    <div>{name}</div>
                  </Tooltip>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
    </>
  );

  return (
    <Grid
      container
      spacing={3}
      sx={{
        mx: 2,
        alignItems: "center",
      }}
      id="items-filters"
    >
      {basicFilters}
      {/* <Grid size={{ xs: 6 }}>
        <FormControlLabel
          control={
            <Switch
              checked={magical}
              onChange={(e) =>
                dispatch({ type: "SET_MAGICAL", payload: e.target.checked })
              }
            />
          }
          label="Magical?"
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="gamesystem-label">Gamesystem</InputLabel>
          <Select
            labelId="gamesystem-label"
            id="gamesystem"
            value={gamesystem}
            onChange={(e) =>
              dispatch({
                type: "SET_GAMESYSTEM",
                payload: e.target.value as string,
              })
            }
            label="Gamesystem"
          >
            <MenuItem value="5e-2014">5th Edition 2014</MenuItem>
            <MenuItem value="5e-2024">5th Edition 2024</MenuItem>
            <MenuItem value="a5e">Advanced 5th Edition</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          id="name-contains"
          label="Name Contains..."
          variant="standard"
          value={nameCont}
          onChange={(e) =>
            dispatch({ type: "SET_NAME_CONT", payload: e.target.value })
          }
        />
      </Grid>
      <Grid size={{ xs: 6 }}>
        <TextField
          id="desc-contains"
          label="Description Contains..."
          variant="standard"
          value={descCont}
          onChange={(e) =>
            dispatch({ type: "SET_DESC_CONT", payload: e.target.value })
          }
        />
      </Grid>
      <Grid size={{ xs: 2 }} offset={{ xs: 1 }}>
        <Typography variant="body1" sx={{ fontSize: "1.4em" }}>
          Cost
        </Typography>
      </Grid>
      <Grid size={{ xs: 8 }} offset={1}>
        <FormControlLabel
          control={
            <Switch
              checked={costVal}
              onChange={(e) =>
                dispatch({ type: "SET_COST_VAL", payload: e.target.checked })
              }
            />
          }
          label={costVal ? "Single Value" : "Range Input"}
        />
      </Grid>
      <Grid size={{ xs: 10 }} offset={{ xs: 1 }}>
        {costVal ? (
          <NumberSpinner
            label="Cost Value"
            size="small"
            value={costValue}
            onValueChange={(value) =>
              dispatch({ type: "SET_COST_VALUE", payload: value ? value : 0 })
            }
          />
        ) : (
          <Slider
            min={0}
            max={40000}
            value={value}
            onChange={(_e, newValue: number[]) =>
              dispatch({ type: "SET_VALUE", payload: newValue })
            }
            valueLabelDisplay="auto"
          />
        )}
      </Grid> */}
    </Grid>
  );
}
