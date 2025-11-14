// import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InteractiveKothis from "../InteractiveKothis";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";

export async function clientLoader() {
  // Home page loader
}

export default function PublicHome() {
  // Home page

  return (
    <Box sx={{ width: 1, textAlign: "center" }}>
      <Grid container>
        <Grid size={{ xs: 12, lg: 6 }} offset={0}>
          <Typography variant="subtitle1" sx={{ px: { xs: 2, lg: 0 } }}>
            <span className="punch-uation">“</span>
            <br />
            As a species we're fundamentally insane. Put more than two of us in
            a room, we pick sides and start dreaming up reasons to kill one
            another. Why do you think we invented politics and religion?
            <br />
            <span className="punch-uation">“</span>
            <br />
            <span className="punch-uation">-</span>Stephen King,{" "}
            <span style={{ fontSize: "1.5rem" }}>The Mist</span>
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }} sx={{ alignContent: "center" }}>
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
            is a homebrewed world for Dungeons & Dragons 5th edition. Created by
            Jacob Pell, and playtested by an amazing group of players, Kothis is
            currntly home to 2 campaigns. This site will be the online
            repository for all things in this world. As the application
            progresses, I hope to add additional functionality for my players
            and other DMs who wish to run a campaign in this, or another world
            found within.{" "}
          </Typography>
        </Grid>
        <Grid size={12} sx={{ marginTop: 5 }}>
          <Card>
            <CardHeader title="A Diverse and Evolving World..." />
            <CardContent component={Grid} container spacing={2}>
              <Grid size={{ xs: 12, lg: 6 }}>
                <InteractiveKothis />
              </Grid>
              <Grid size={{ xs: 12, lg: 6 }}>
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
