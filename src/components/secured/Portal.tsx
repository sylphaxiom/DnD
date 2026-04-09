import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

export default function Portal() {
  return (
    <Box>
      <Typography variant="h2" sx={{ textAlign: "center", width: 1, my: 4 }}>
        The Kothis Portal
      </Typography>
      <Grid container spacing={3}>
        <Grid size={5} offset={1}>
          <Typography sx={{ mx: 1 }}>
            The Kothis Portal is a website that houses everything to do with
            Kothis; rules, characters, locations, whatever. This world may have
            started as the dream of 1 person, but it grew with the help of many
            more. We are still playing 2 campaigns within the world of Kothis so
            it is still growing by the week. There is more specific world
            details on the <Link to="/world">world page</Link>, but Kothis is a
            diverse world still finding its way. Both campaigns take place in a
            Kothis that has lost its history. For 742 years, Kothis has existed
            without a past. Due to the work of the Conundrums, and another group
            of adventurers, that forgotten past is about to be uncovered. With
            any luck, the adventurers will prevail before others can undo the
            very fabric of the world around them all.
          </Typography>
        </Grid>
        <Grid size={5}>
          <Typography sx={{ mx: 1 }}>
            Even though Kothis has way more content than is on this site, that's
            because the portal is pretty new. Between life, family, work, the
            campaigns that created Kothis, and my websites... it's going to take
            me some time to get it all put in here. I try to release what I can,
            when I can. I'd love any feedback that you may have. Maybe there is
            a feature you would like to see, maybe you just want to be a part of
            the project, I don't know, but I'll welcome it! Poke around, sign up
            and stay awhile. Until I have things put together here, you will
            have to reach out to me on my personal site,{" "}
            <Link to="https://sylphaxiom.com">sylphaxiom.com</Link> Thanks for
            visiting and hopefully you'll decide to stick around. Maybe join a
            campaign or just learn about the game, who cares! Just have fun and
            enjoy the Kothis Portal!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
