import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchGameSystems, type GameSystem } from "../workhorse/Queries";

interface FilterProps {
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
  bgRef?: React.Ref<{
    name: string;
    gameSystem: string[];
    exact: boolean;
  }>;
  ftRef?: React.Ref<{
    name: string;
    gameSystem: string[];
    exact: boolean;
  }>;
  ruRef?: React.Ref<{
    name: string;
    gameSystem: string[];
    exact: boolean;
  }>;
  doRef?: React.Ref<{
    name: string;
    gameSystem: string[];
    exact: boolean;
  }>;
}

export interface BgFilter {
  name: string;
  gameSystem: string[];
  exact: boolean;
}
export interface FtFilter {
  name: string;
  gameSystem: string[];
  exact: boolean;
}
export interface RuFilter {
  name: string;
  gameSystem: string[];
  exact: boolean;
}
export interface DoFilter {
  name: string;
  gameSystem: string[];
  exact: boolean;
}

export default function Filters({
  topic,
  bgRef,
  ftRef,
  ruRef,
  doRef,
}: FilterProps) {
  const [name, setName] = React.useState("");
  const [gameSystem, setGameSystem] = React.useState<string[]>([]);
  const [exact, setExact] = React.useState(false);

  // Imperitive handle for Backgrounds.
  React.useImperativeHandle(bgRef, () => {
    return { name: name, gameSystem: gameSystem, exact: exact };
  }, [name, gameSystem, exact]);

  // Imperitive handle for Feats.
  React.useImperativeHandle(ftRef, () => {
    return { name: name, gameSystem: gameSystem, exact: exact };
  }, [name, gameSystem, exact]);

  // Imperitive handle for Rules.
  React.useImperativeHandle(ruRef, () => {
    return { name: name, gameSystem: gameSystem, exact: exact };
  }, [name, gameSystem, exact]);

  // Imperitive handle for Documents
  React.useImperativeHandle(doRef, () => {
    return { name: name, gameSystem: gameSystem, exact: exact };
  }, [name, gameSystem, exact]);

  // get the Game Systems list
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

  const handleChange = (event: SelectChangeEvent<typeof gameSystem>) => {
    const {
      target: { value },
    } = event;
    setGameSystem(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

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
  const basicFilters = [
    <Grid size={{ xs: 12, sm: 8 }} key="name-grid">
      <TextField
        id="name-contains"
        label="Name Contains..."
        variant="standard"
        fullWidth
        value={name}
        key="name-text"
        onChange={(e) => setName(e.currentTarget.value)}
      />
    </Grid>,
    <Grid size={{ xs: 12, sm: 4 }} sx={{ alignSelf: "end" }} key="exact-grid">
      <FormControlLabel
        labelPlacement="start"
        key="exact-label"
        control={
          <Switch
            checked={exact}
            key="exact-switch"
            onChange={(e) => setExact(e.currentTarget.checked)}
          />
        }
        label="Exact Match?"
      />
    </Grid>,
    <Grid size={{ xs: 12 }} key="gamesystem-grid">
      <FormControl
        variant="standard"
        key="gamesystem-control"
        sx={{ p: 1, minWidth: "100%" }}
      >
        <InputLabel key="gamesystem-label" id="gamesystem-label">
          Gamesystem
        </InputLabel>
        <Select
          labelId="gamesystem-label"
          id="gamesystem"
          multiple
          value={gameSystem}
          onChange={handleChange}
          label="Gamesystem"
          key="gamesystem-select"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {gameSystems?.map(({ key, name, desc }: GameSystem) => {
            return (
              <MenuItem value={key} key={key + "-item"}>
                <Tooltip title={desc} key={key}>
                  <div key={key + "-" + name}>{name}</div>
                </Tooltip>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>,
  ];
  let filters = [];
  switch (topic) {
    case "spells":
      // Use spell filters
      break;
    case "items":
      // Use item filters
      break;
    case "species":
      // Use species filters
      break;
    case "classes":
      // Use classes filters
      break;
    case "creatures":
      // Use creatures filters
      break;
    default:
      filters.push(basicFilters);
      break;
  }

  return (
    <Grid
      container
      spacing={3}
      sx={{
        p: 3,
        alignItems: "center",
      }}
      id="items-filters"
    >
      {filters.map((filter) => {
        return filter;
      })}
    </Grid>
  );
}
