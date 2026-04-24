import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
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
import Typography from "@mui/material/Typography";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import type { Topics } from "../nonAuth/PublicLore";
import {
  fetchFtPrereqs,
  fetchGameSystems,
  fetchLicenses,
  fetchPublishers,
  type GameSystem,
  type License,
  type Publisher,
} from "../workhorse/Queries";

interface FilterProps {
  topic: Topics;
  bgRef?: React.Ref<{
    name: string;
    gameSystem: string[];
    exact: boolean;
  }>;
  ftRef?: React.Ref<{
    name: string;
    gameSystem: string[];
    exact: boolean;
    featType: fTypes[];
    prereqs: string[];
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
    license: string[];
    publisher: string[];
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
  featType: fTypes[];
  prereqs: string[];
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
  license: string[];
  publisher: string[];
}

export type fTypes = "GENERAL" | "Origin" | "Fighting Style" | "Epic Boon";

export default function Filters({
  topic,
  bgRef,
  ftRef,
  ruRef,
  doRef,
}: FilterProps) {
  const [name, setName] = React.useState("");
  const [gameSystem, setGameSystem] = React.useState<string[]>([]);
  const [featType, setFeatType] = React.useState<fTypes[]>([]);
  const [prereq, setPrereq] = React.useState<string[]>([]);
  const [exact, setExact] = React.useState(false);
  const [license, setLicense] = React.useState<string[]>([]);
  const [publisher, setPublisher] = React.useState<string[]>([]);

  // Imperitive handle for Backgrounds.
  React.useImperativeHandle(bgRef, () => {
    return { name: name, gameSystem: gameSystem, exact: exact };
  }, [name, gameSystem, exact]);

  // Imperitive handle for Feats.
  React.useImperativeHandle(ftRef, () => {
    return {
      name: name,
      gameSystem: gameSystem,
      exact: exact,
      featType: featType,
      prereqs: prereq,
    };
  }, [name, gameSystem, exact, featType, prereq]);

  // Imperitive handle for Rules.
  React.useImperativeHandle(ruRef, () => {
    return { name: name, gameSystem: gameSystem, exact: exact };
  }, [name, gameSystem, exact]);

  // Imperitive handle for Documents
  React.useImperativeHandle(doRef, () => {
    return {
      name: name,
      gameSystem: gameSystem,
      exact: exact,
      license: license,
      publisher: publisher,
    };
  }, [name, gameSystem, exact, license, publisher]);

  // get the Game Systems list
  const { data, error } = useQuery({
    queryKey: ["getGamesystem"],
    queryFn: () => fetchGameSystems(),
  });
  const gameSystems: GameSystem[] = data?.results || [];
  if (error) {
    console.log(
      "Something went wrong here.\nError message: %s\nReturned Data: %s",
      JSON.stringify(error.message),
      JSON.stringify(data),
    );
  }

  // get the Prerequisite list
  const { data: ftPrereqData, error: ftPrereqError } = useQuery({
    queryKey: ["getFtPrereqs"],
    queryFn: () => fetchFtPrereqs(),
  });
  const ftRawPrereqs = ftPrereqData?.results;
  let ftPrereqs: string[] = [];
  if (ftRawPrereqs) {
    ftRawPrereqs.map((prereq) =>
      ftPrereqs.includes(prereq.prerequisite) ||
      prereq.prerequisite === "*N/A*" ||
      prereq.prerequisite === ""
        ? null
        : ftPrereqs.push(prereq.prerequisite),
    );
  }
  if (ftPrereqError) {
    console.log(
      "Something went wrong here.\nError message: %s\nReturned Data: %s",
      JSON.stringify(ftPrereqError.message),
      JSON.stringify(ftPrereqData),
    );
  }

  // get the Publisher list
  const { data: publisherData, error: publisherError } = useQuery({
    queryKey: ["getPublishers"],
    queryFn: () => fetchPublishers(),
  });
  const publishers: Publisher[] = publisherData?.results || [];
  if (publisherError) {
    console.log(
      "Something went wrong here.\nError message: %s\nReturned Data: %s",
      JSON.stringify(publisherError.message),
      JSON.stringify(publisherData),
    );
  }

  // get the License list
  const { data: licenseData, error: licenseError } = useQuery({
    queryKey: ["getLicenses"],
    queryFn: () => fetchLicenses(),
  });
  const licenses: License[] = licenseData?.results || [];
  if (licenseError) {
    console.log(
      "Something went wrong here.\nError message: %s\nReturned Data: %s",
      JSON.stringify(licenseError.message),
      JSON.stringify(licenseData),
    );
  }

  const fTypes: fTypes[] = ["GENERAL", "Origin", "Fighting Style", "Epic Boon"];

  const handleGamesystemChange = (
    event: SelectChangeEvent<typeof gameSystem>,
  ) => {
    const {
      target: { value },
    } = event;
    setGameSystem(typeof value === "string" ? value.split(",") : value);
  };

  const handlePrereqChange = (event: SelectChangeEvent<typeof prereq>) => {
    const {
      target: { value },
    } = event;
    setPrereq(typeof value === "string" ? value.split(",") : value!);
  };

  const handleFeatChange = (event: SelectChangeEvent<typeof featType>) => {
    const {
      target: { value },
    } = event;
    setFeatType(
      typeof value === "string"
        ? (value.split(",") as fTypes[])
        : (value as fTypes[]),
    );
  };

  const handleLicenseChange = (event: SelectChangeEvent<typeof license>) => {
    const {
      target: { value },
    } = event;
    setLicense(
      typeof value === "string"
        ? (value.split(",") as typeof license)
        : (value as typeof license),
    );
  };
  const handlePublisherChange = (
    event: SelectChangeEvent<typeof publisher>,
  ) => {
    const {
      target: { value },
    } = event;
    console.log("Publisher info is: %s", value);
    setPublisher(
      typeof value === "string"
        ? (value.split(",") as typeof publisher)
        : (value as typeof publisher),
    );
  };

  const handleClear = () => {
    setName("");
    setGameSystem([]);
    setExact(false);
    setFeatType([]);
    setPrereq([]);
    setLicense([]);
    setPublisher([]);
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
    <Grid size={{ xs: 12, md: "grow" }} key="gamesystem-grid">
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
          onChange={handleGamesystemChange}
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

  const featFilters = [
    <Grid size={{ xs: 12, md: "grow" }} key="featType-grid">
      <FormControl
        variant="standard"
        key="featType-control"
        sx={{ p: 1, minWidth: "100%" }}
      >
        <InputLabel key="featType-label" id="featType-label">
          Feat Type
        </InputLabel>
        <Select
          labelId="featType-label"
          id="featType"
          multiple
          value={featType}
          onChange={handleFeatChange}
          label="Feat Type"
          key="featType-select"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={
                    value === "GENERAL"
                      ? value.substring(0, 1) + value.slice(1).toLowerCase()
                      : value
                  }
                />
              ))}
            </Box>
          )}
        >
          {fTypes?.map((type) => {
            return (
              <MenuItem value={type} key={type + "-item"}>
                {type === "GENERAL"
                  ? type.substring(0, 1) + type.slice(1).toLowerCase()
                  : type}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>,
    <Grid size={{ xs: 12, md: "grow" }} key="prereq-grid">
      <FormControl
        variant="standard"
        key="prereq-control"
        sx={{ p: 1, minWidth: "100%" }}
      >
        <InputLabel key="prereq-label" id="prereq-label">
          Prerequisites
        </InputLabel>
        <Select
          labelId="prereq-label"
          id="prereq"
          multiple
          value={prereq}
          onChange={handlePrereqChange}
          label="Feat Type"
          key="prereq-select"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  sx={{ maxWidth: "100px" }}
                  label={value.replaceAll("*", "")}
                />
              ))}
            </Box>
          )}
        >
          {ftPrereqs?.map((prereq) => {
            return (
              <MenuItem value={prereq} key={prereq + "-item"}>
                <Tooltip
                  title={prereq.replaceAll("*", "")}
                  key={prereq + "-tooltip"}
                >
                  <Typography
                    component={"span"}
                    sx={{ fontSize: "1em" }}
                    noWrap
                    key={prereq + "-type"}
                  >
                    {prereq.replaceAll("*", "")}
                  </Typography>
                </Tooltip>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>,
  ];

  const referenceFilters = [
    <Grid size={{ xs: 12, md: "grow" }} key="license-grid">
      <FormControl
        variant="standard"
        key="license-control"
        sx={{ p: 1, minWidth: "100%" }}
      >
        <InputLabel key="license-label" id="license-label">
          License
        </InputLabel>
        <Select
          labelId="license-label"
          id="license"
          multiple
          value={license}
          onChange={handleLicenseChange}
          label="license"
          key="license-select"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {licenses?.map(({ key, name }: License) => {
            return (
              <MenuItem value={key} key={key + "-item"}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Grid>,
    <Grid size={{ xs: 12, md: "grow" }} key="publisher-grid">
      <FormControl
        variant="standard"
        key="publisher-control"
        sx={{ p: 1, minWidth: "100%" }}
      >
        <InputLabel key="publisher-label" id="publisher-label">
          Publisher
        </InputLabel>
        <Select
          labelId="publisher-label"
          id="publisher"
          multiple
          value={publisher}
          onChange={handlePublisherChange}
          label="Publisher"
          key="publisher-select"
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {publishers?.map(({ key, name }: Publisher) => {
            return (
              <MenuItem value={key} key={key + "-item"}>
                {name}
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
    case "feats":
      filters.push(...basicFilters);
      filters.push(...featFilters);
      break;
    case "references":
      filters.push(...basicFilters);
      filters.push(...referenceFilters);
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
      <Button
        variant="contained"
        fullWidth
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleClear}
      >
        Clear Filters
      </Button>
    </Grid>
  );
}
