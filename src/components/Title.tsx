//import * as React from "react"
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Title = () => {
  return (
    <Grid container direction={"row"}>
      <Grid size={4}>
        <Avatar
          alt="Spinning globe with a butt"
          src="https://tinyurl.com/26y887s6"
          sx={{ width: 200, height: 200 }}
        ></Avatar>
      </Grid>
      <Grid size={8} my={3}>
        <Stack>
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
            lineHeight={0.8}
          >
            Kothis
          </Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default Title;
