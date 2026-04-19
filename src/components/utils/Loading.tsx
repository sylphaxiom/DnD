import * as React from "react";
import * as motion from "motion/react-client";
import * as motions from "motion/react";
import { stagger } from "motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useParams, Link } from "react-router";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

export default function Loading() {
  const [scope, animate] = motions.useAnimate();
  let title = "LOADING...";
  let subtitle = null;
  let display = "none";
  const params = useParams();
  const catchall = params["*"];
  if (catchall) {
    title = "Oops!";
    subtitle = "Looks like you tried to go to /" + catchall;
    display = "flex";
  }
  const lengthVal = title.length;
  const durationVal = lengthVal / 10;
  const staggerVal = durationVal / 10;
  const totalVal = durationVal + staggerVal + 0.4;

  React.useEffect(() => {
    animate(
      "span",
      { y: [-35, -105, -35] },
      {
        delay: stagger(staggerVal),
        duration: durationVal,
        ease: "easeInOut",
        repeat: Infinity,
        repeatDelay: totalVal,
      },
    );
  }, []);

  return (
    <Box
      id="loader_scr"
      sx={{
        p: 0,
        textAlign: "center",
        mx: 4,
      }}
    >
      <img
        src={"/waiting_500x200.svg"}
        id="loading_img"
        className="svg"
        alt="A dude waiting by his computer with his 2 cats"
        width={"50%"}
        height={"auto"}
      />
      <motions.AnimatePresence initial={false} mode="wait">
        <motion.div
          layout
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            overflow: "visible",
            fontFamily: "Courier New, monospace",
            fontSize: "7em",
            fontWeight: 700,
          }}
          ref={scope}
        >
          {title.split("").map((char: string, index: number) => {
            return <motion.span key={char + index}>{char}</motion.span>;
          })}
        </motion.div>
      </motions.AnimatePresence>
      <Typography variant="h2" component="div" sx={{ marginBottom: 10 }}>
        {subtitle}
      </Typography>
      {/* {variant && (
        <Button
          size="large"
          href={variant}
          title=">>> PUSH ME <<<"
          color="error"
          sx={{ m: 5 }}
        />
      )} */}
      <Grid container sx={{ display: display }}>
        <Grid size={4} offset={2}>
          <Typography variant="h5">
            Unfortunately, that is not a proper route on this website. Perhaps
            you meant to go to one of these links?
          </Typography>
        </Grid>
        <Grid size={1} offset={1}>
          <Stack>
            <Typography variant="h5">Creative Links</Typography>
            <Link to={"/creative/home"}>Home</Link>
            <Link to={"/creative/people"}>People</Link>
            <Link to={"/creative/projects"}>Projects</Link>
          </Stack>
        </Grid>
        <Grid size={1} sx={{ px: 2 }}>
          <Stack>
            <Typography variant="h5">Portfolio Links</Typography>
            <Link to={"/creative/portfolio"}>Portfolio</Link>
            <Link to={"/creative/Web"}>Web</Link>
            <Link to={"/creative/Assets"}>Assets</Link>
            <Link to={"/creative/Writing"}>Writing</Link>
          </Stack>
        </Grid>
        <Grid size={1}>
          <Typography variant="h5">Shared Links</Typography>
          <Link to={"/contact"}>Contact</Link>
        </Grid>
      </Grid>
    </Box>
  );
}
