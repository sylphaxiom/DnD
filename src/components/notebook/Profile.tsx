import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayer } from "../workhorse/Queries";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import { Link } from "react-router";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import TestingForm from "../forms/TestingForm";
import { PlayerForm } from "../workhorse/SecureForms";

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});

export async function clientLoader() {}

export function Profile() {
  const { user, isAuthenticated } = useAuth0();
  const { isLoading, data, error } = useQuery({
    queryKey: ["getPlayer", user?.preferred_username, user?.email],
    queryFn: () =>
      fetchPlayer(isAuthenticated, user?.preferred_username, user?.email),
  });
  const player = data?.message[0];
  let prefs = {};
  let profImg = "Arris_fallback.jpg";

  if (player?.prefs) {
    prefs = JSON.parse(player?.prefs);
    console.log("After parsing prefs are: %o", prefs);
  }

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

  return isAuthenticated && user ? (
    <Box>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        Welcome to your profile, {player?.first_name}
      </Typography>
      <Grid container spacing={3}>
        <Grid size={10} offset={1} sx={{ my: 2 }}>
          <Typography sx={{ mx: 1 }}>
            This is where you will find all of our profile info, name, image,
            whatever. I would also like to set up a "character mode" where the
            display names, access levels, images, etc are replaced with the
            correlating info from the character you select. Cool, huh? Yea that
            is going to have to be down the road though, lots to put together
            before then.
          </Typography>
        </Grid>
        <Grid size={12} container sx={{ alignItems: "center" }}>
          <Grid size={2} id="img_cont">
            <Paper
              elevation={8}
              id="img_bg"
              sx={{
                width: 150,
                height: 150,
                display: "flex",
                borderRadius: "100%",
                backgroundColor: "teal",
                alignItems: "center",
              }}
            >
              <img
                src={`/resources/character_images/${profImg}`}
                alt="Dapper photo of Jacob Pell with his magnificent beard"
                width={125}
                height={125}
                style={{
                  borderRadius: "100%",
                  margin: "0 auto",
                }}
                id="creator_img"
              />
            </Paper>
          </Grid>
          <Grid size={3}>
            <Grid container columns={3} id="demographics">
              <Grid size={3}>
                <Typography variant="h4" id="creator_name">
                  {player?.first_name + " " + player?.last_name}
                </Typography>
                <Divider sx={{ width: 0.8 }} id="creator_level">
                  Data
                </Divider>
              </Grid>
              <Grid size={1}>
                <Typography variant="subtitle2">Email:</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant="subtitle2" id="creator_species">
                  {player?.email}
                </Typography>
              </Grid>
              <Grid size={1}>
                <Typography variant="subtitle2">Username:</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant="subtitle2" id="creator_class">
                  {player?.username}
                </Typography>
              </Grid>
              <Grid size={1}>
                <Typography variant="subtitle2">Role:</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant="subtitle2" id="creator_subclass">
                  {player?.role}
                </Typography>
              </Grid>
              <Grid size={1}>
                <Typography variant="subtitle2">Preferences:</Typography>
              </Grid>
              <Grid size={2} offset={1}>
                <List dense>
                  <Typography variant="subtitle2">No Preferences</Typography>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={7}>
            <Grid container columns={6}>
              <PlayerForm
                children={<TestingForm version="player" />}
                player={player!}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  ) : null;
}
