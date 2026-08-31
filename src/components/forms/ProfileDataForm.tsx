import { useAuth0 } from "@auth0/auth0-react";
import Box from "@mui/material/Box";
import { useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { updatePlayer, type Player } from "../workhorse/Queries";
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
  const { first_name, last_name, email } = player;
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const [submitting, setSubmitting] = React.useState(false);
  const fnmHelper = "";
  const lnmHelper = "";
  const emlHelper = "";

  // Submitted directly here (not via a React Router fetcher/clientAction) —
  // a clientAction runs outside React component context, so it has no way
  // to call useAuth0()'s getAccessTokenSilently() to get a real token to
  // send. Handling it in the component keeps that available.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      await updatePlayer(getAccessTokenSilently, formData);
      await queryClient.invalidateQueries({ queryKey: ["getPlayer"] });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Typography sx={{ my: 2 }}>
        Need to make a couple changes to your information? You can do so here!
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid size={3}>
            <TextField
              label="First Name"
              name="first_name"
              defaultValue={first_name}
              helperText={fnmHelper}
            />
          </Grid>
          <Grid size={3}>
            <TextField
              label="Last Name"
              name="last_name"
              defaultValue={last_name}
              helperText={lnmHelper}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              label="Email"
              name="email"
              defaultValue={email}
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
                disabled
              />
              <FormHelperText>
                Upload a new profile image (optional) — not yet wired up on
                the backend
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid size={4}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={submitting}
            >
              Update Me
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
