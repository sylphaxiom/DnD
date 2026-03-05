import Box from "@mui/material/Box";
import { useFetcher } from "react-router";
import type { Player } from "../workhorse/Queries";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

interface ProfileDataFormProps {
  player: Player;
}
export default function ProfileDataForm({ player }: ProfileDataFormProps) {
  const { first_name, last_name, username, email, role, prefs } = player;
  const fetcher = useFetcher({ key: "profileUpdate" });
  const fnmHelper = "";
  const lnmHelper = "";
  const emlHelper = "";

  return (
    <Box>
      <Typography sx={{ my: 2 }}>
        Need to make a couple changes to your information? You can do so here!
      </Typography>
      <fetcher.Form method="patch">
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size={3}>
            <TextField
              label="First Name"
              name="first_name"
              value={first_name}
              helperText={fnmHelper}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              label="Last Name"
              name="last_name"
              value={last_name}
              helperText={lnmHelper}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Email"
              name="email"
              value={email}
              helperText={emlHelper}
            />
          </Grid>
          <Grid size={8}>
            <InputLabel htmlFor="profile-image">Profile Image</InputLabel>
            <FormControl>
              <Input
                type="file"
                name="profile_image"
                inputProps={{ accept: "image/*" }}
              />
              <FormHelperText>
                Upload a new profile image (optional)
              </FormHelperText>
            </FormControl>
          </Grid>
          <Input
            type="hidden"
            name="username"
            value={username}
            sx={{ display: "none" }}
          />
          <Input
            type="hidden"
            name="role"
            value={role}
            sx={{ display: "none" }}
          />
          <Input
            type="hidden"
            name="prefs"
            value={prefs}
            sx={{ display: "none" }}
          />
          <Grid size={4}>
            <Button type="submit" variant="contained" color="primary">
              Update Me
            </Button>
          </Grid>
        </Grid>
      </fetcher.Form>
    </Box>
  );
}
