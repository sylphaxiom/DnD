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
import TextField from "@mui/material/TextField";
import NumberSpinner from "../workhorse/NumberSpinner";
import Slider from "@mui/material/Slider";

export async function clientLoader() {
  // Lore page loader
}

export default function PublicLore() {
  // Lore page
  const [topic, setTopic] = React.useState("");
  const [magical, setMagical] = React.useState(false);
  const [gamesystem, setGamesystem] = React.useState("");
  const [nameCont, setNameCont] = React.useState("");
  const [descCont, setDescCont] = React.useState("");
  const [costVal, setCostVal] = React.useState(true);
  const [value, setValue] = React.useState<number[]>([500, 9000]);

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
      <Grid size={{ xs: 12 }}>
        <Typography variant="body1" sx={{ mx: 3, mt: 3, fontSize: "1.4em" }}>
          What do we want to look at today?
        </Typography>
      </Grid>
      <Grid size={{ xs: 5 }} offset={{ xs: 1 }}>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 150 }}>
          <InputLabel id="search-topic-label">Topic</InputLabel>
          <Select
            labelId="search-topic-label"
            id="search-topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value as string)}
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
      <Grid size={{ xs: 6 }}>
        <Typography variant="body1" sx={{ mx: 3, mt: 3, fontSize: "1.4em" }}>
          Any filters?
        </Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{ mx: 3, mt: 1, alignItems: "center" }}
        id="items-filters"
      >
        <Grid size={{ xs: 6 }}>
          <FormControlLabel
            control={
              <Switch
                checked={magical}
                onChange={(e) => setMagical(e.target.checked)}
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
              onChange={(e) => setGamesystem(e.target.value as string)}
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
            onChange={(e) => setNameCont(e.target.value)}
          />
        </Grid>
        <Grid size={{ xs: 6 }}>
          <TextField
            id="desc-contains"
            label="Description Contains..."
            variant="standard"
            value={descCont}
            onChange={(e) => setDescCont(e.target.value)}
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
                onChange={(e) => setCostVal(e.target.checked)}
              />
            }
            label={costVal ? "Single Value" : "Range Input"}
          />
        </Grid>
        <Grid size={{ xs: 10 }} offset={{ xs: 1 }}>
          {costVal ? (
            <NumberSpinner label="Cost Value" size="small" />
          ) : (
            <Slider
              min={0}
              max={40000}
              value={value}
              onChange={(_e, newValue: number[]) => setValue(newValue)}
              valueLabelDisplay="auto"
            />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
