//import * as React from "react"
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Title() {
  return (
    <Grid container px={3} width={1} py={1} maxHeight={300}>
      <Grid size={{ xs: 0, lg: 3, xl: 4 }}>
        <Avatar
          alt="Emblem of Kothis"
          src="/kothis.svg"
          sx={{ width: "75%", height: "auto" }}
        ></Avatar>
      </Grid>
      <Grid size={{ xs: 12, lg: 9, xl: 8 }} my={3}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 0, md: 3 }}
          py={{ md: 2 }}
        >
          <Typography
            variant="h3"
            align="center"
            fontFamily={"Almendra SC, serif"}
          >
            Welcom To
          </Typography>
          <Typography
            variant="h1"
            align="center"
            fontFamily={"Almendra SC, serif"}
            lineHeight={{ md: 0.8 }}
          >
            Kothis
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
}
