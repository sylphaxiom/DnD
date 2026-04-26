// import * as React from "react";
import { Divider, Paper, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import InteractiveKothis from "../utils/InteractiveKothis";

export async function clientLoader() {
  // Home page loader
}

export default function PublicHome() {
  // Home page
  const theme = useTheme();

  return (
    <Box sx={{ width: 1, textAlign: "center" }} tabIndex={0} role="main">
      <Grid container>
        <Grid size={{ xs: 12 }}>
          <Divider variant="middle" sx={{ my: 2 }} />
          <Typography variant="h2" sx={{ textAlign: "center", width: 1 }}>
            The Setting
          </Typography>
          <Divider variant="middle" sx={{ my: 1 }} />
        </Grid>
        <Grid size={{ xs: 12 }} offset={0}>
          <Paper sx={{ justifyContent: "center", mb: 4 }}>
            <Typography variant="subtitle1">Quick Links</Typography>
            <Link
              to="/world/lore"
              style={{
                color: theme.palette.primary.main,
                textDecoration: "none",
              }}
            >
              Lore Hub
            </Link>
          </Paper>
        </Grid>
        <Grid size={{ xs: 12 }} sx={{ alignContent: "center" }}>
          <Typography
            sx={{
              p: 4,
              textIndent: "50px",
              textAlign: "justify",
            }}
          >
            <span
              style={{
                fontSize: "2.3rem",
                lineHeight: "1rem",
              }}
            >
              Kothis
            </span>{" "}
            is a homebrewed, TTRPG world created by Jacob Pell, and playtested
            by an amazing group of players, Kothis is currntly home to 2
            campaigns with the hopes of having many more in the future! This
            site will be the online repository for all things in this world. As
            the application progresses, I hope to add additional functionality
            for my players and other DMs who wish to run a campaign in this, or
            another world found within. Some of those features will include:
            Campaign scheduling/organization, Player tracking (for DMs),
            Character creator, Homebrewery, and more.{" "}
          </Typography>
        </Grid>
        <Grid size={12} sx={{ marginTop: 5 }}>
          <Card>
            <CardHeader title="A Diverse and Evolving World..." />
            <CardContent component={Grid} container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <InteractiveKothis />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography sx={{ textAlign: "justify", textIndent: "3em" }}>
                  The nations of Kothis are each unique in their own way. From
                  the mountain dwellings of the dwarves in the Herzog Kingdom,
                  to the open plains of the Praetorian Empire, you will find
                  something for any adventurer.
                </Typography>
                <br />
                <Typography sx={{ textAlign: "justify", textIndent: "3em" }}>
                  The world itself has evolved as The Conundrums and Forgotten
                  Pasts campaigns continue their story. Each party member adding
                  something unique to the game and the world. We have homebrewed
                  new mechanics, transformations, items, and even classes for
                  this world.
                </Typography>
                <br />
                <Typography sx={{ textAlign: "justify", textIndent: "50px" }}>
                  We hope to share it all with you so that others can come to
                  love this world and its crazy inhabitants as much as we have.
                </Typography>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
