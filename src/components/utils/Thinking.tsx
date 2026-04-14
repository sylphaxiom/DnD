import * as React from "react";
import * as motion from "motion/react-client";
import * as motions from "motion/react";
import { stagger } from "motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Avatar } from "@mui/material";
import { infiniteQueryOptions } from "@tanstack/react-query";

export default function Loading() {
  //   React.useEffect(() => {nly animate when title is set

  //     const frameId = requestAnimationFrame(() => {
  //       animate(
  //         "span",
  //         { rotateY:360 },
  //         {
  //           delay: stagger(stagr),
  //           duration: duration,
  //           ease: ["easeInOut"],
  //           repeat: Infinity,
  //           repeatDelay: total,
  //         },
  //       );
  //     });

  //     return () => cancelAnimationFrame(frameId);
  //   }, [displayTitle, animate, stagr, duration, total]);

  const time = motions.useTime();
  const rotate = motions.useTransform(time, [0, 1500], [0, 360], {
    clamp: false,
  });

  return (
    <Box
      id="spinDaddy"
      sx={{
        p: 0,
        textAlign: "center",
        mx: 4,
      }}
    >
      <motion.img
        id="dragonSpinner"
        src="/dragon_spinner.svg"
        style={{
          rotate: rotate,
        }}
      />
      <img src="/kothis.svg" id="logoBG" />
    </Box>
  );
}
