import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

export default function Creators() {
  return (
    <Box>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        The Creators of Kothis
      </Typography>
      <Grid container spacing={3}>
        <Grid size={10} offset={1} sx={{ my: 2 }}>
          <Typography sx={{ mx: 1 }}>
            This is where I will be putting all the pictures and names of the
            people (or characters) that made Kothis a fun place to be.
            Unfortunately, I have to ask their permission first. So in the
            meantime, you will have to settle for just me. Sorry...
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
                src="/9-2025_headshot_1x1.png"
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
                  Jacob Pell
                </Typography>
                <Divider sx={{ width: 0.8 }} id="creator_level">
                  Level 8
                </Divider>
              </Grid>
              <Grid size={1}>
                <Typography variant="subtitle2">Species:</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant="subtitle2" id="creator_species">
                  Human
                </Typography>
              </Grid>
              <Grid size={1}>
                <Typography variant="subtitle2">Class:</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant="subtitle2" id="creator_class">
                  Game Master
                </Typography>
              </Grid>
              <Grid size={1}>
                <Typography variant="subtitle2">Subclass:</Typography>
              </Grid>
              <Grid size={2}>
                <Typography variant="subtitle2" id="creator_subclass">
                  Rule of Cool
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid size={7}>
            <Grid container columns={6}>
              <Grid size={1}>
                <Typography variant="subtitle2">Background:</Typography>
              </Grid>
              <Grid size={5}>
                <Typography>
                  Jacob set out to be the greatest Game Master in the world! He
                  found success too! It was just in his own world, rather than
                  the one we currently live in. Oh well. At least there are
                  still games to master!
                </Typography>
              </Grid>
              <Grid size={1}>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  Notes:
                </Typography>
              </Grid>
              <Grid size={4}>
                <List dense>
                  <ListItem disableGutters disablePadding>
                    Mostly harmless.
                  </ListItem>
                  <ListItem disableGutters disablePadding>
                    Loves players into the roleplay
                  </ListItem>
                  <ListItem disableGutters disablePadding>
                    Bad at remembering the rules (or anything else)
                  </ListItem>
                  <ListItem disableGutters disablePadding>
                    Probably working on this website or his{" "}
                    <Link
                      to="https://sylphaxiom.com/portfolio"
                      style={{ marginLeft: 5 }}
                    >
                      portfolio
                    </Link>
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
