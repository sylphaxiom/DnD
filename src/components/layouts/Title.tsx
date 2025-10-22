//import * as React from "react"
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Title() {
  return (
    <Grid container px={3} width={1} py={1} maxHeight={300}>
      <Grid size={4}>
        {/* <Avatar
          alt="Spinning globe with a butt"
          src="https://tinyurl.com/26y887s6"
          sx={{ width: 200, height: 200 }}
        ></Avatar> */}
        <Avatar
          alt="Emblem of Kothis"
          src="kothis.svg"
          sx={{ width: 300, height: 300 }}
        ></Avatar>
      </Grid>
      <Grid size={8} my={3}>
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
            Welcome to
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
