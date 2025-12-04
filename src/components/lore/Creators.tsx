import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

export default function Creators() {
  return (
    <Box>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        The Creators of Kothis
      </Typography>
      <Grid container spacing={3}>
        <Grid size={"grow"} offset={2}>
          <Typography sx={{ mx: 1 }}>
            This is where I will be putting all the pictures and names of the
            people (or characters) that made Kothis a fun place to be.
            Unfortunately, I have to ask their permission first. So in the
            meantime, you will have to settle for just me. Sorry...
          </Typography>
        </Grid>
        <Grid size={10} offset={1}>
          <Typography sx={{ mx: 1 }}></Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
