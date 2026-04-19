import type { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import * as motions from "motion/react";
import * as motion from "motion/react-client";
import * as React from "react";

interface ThinkingProps {
  sizing?: "small" | "medium" | "large";
}

export default function Thinking(props: ThinkingProps) {
  console.log("Passed sizing is: %o", props);
  const time = motions.useTime();
  const rotate = motions.useTransform(time, [0, 1500], [0, 360], {
    clamp: false,
  });

  React.useEffect(() => {
    console.log("inside useEffect: %s", props.sizing);
  }, []);

  let daddy: SxProps;
  let logo: React.CSSProperties;

  switch (props.sizing) {
    case "large":
      console.log("reached large Thinking");
      daddy = {
        position: "relative",
        textAlign: "center",
        padding: 0,
        width: "250px",
        height: "250px",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
        overflow: "hidden",
      };
      logo = {
        position: "absolute",
        width: "100px",
        height: "100px",
        alignSelf: "center",
        marginLeft: "75px",
      };
      break;
    case "medium":
      console.log("reached medium Thinking");
      daddy = {
        position: "relative",
        textAlign: "center",
        padding: 0,
        width: "175px",
        height: "175px",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
      };
      logo = {
        position: "absolute",
        width: "75px",
        height: "75px",
        alignSelf: "center",
        marginLeft: "50px",
      };
      break;
    case "small":
      console.log("reached small Thinking");
      daddy = {
        position: "relative",
        textAlign: "center",
        padding: 0,
        width: "100px",
        height: "100px",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
      };
      logo = {
        position: "absolute",
        width: "50px",
        height: "50px",
        alignSelf: "center",
        marginLeft: "25px",
      };
      break;
    default:
      console.log("reached default Thinking");
      daddy = {
        position: "relative",
        width: "250px",
        height: "250px",
        display: "flex",
        marginLeft: "auto",
        marginRight: "auto",
      };
      logo = {
        position: "absolute",
        width: "100px",
        height: "100px",
        alignSelf: "center",
        marginLeft: "75px",
      };
      break;
  }

  console.log("Styles as follows:\ndaddy: %o | logo: %o", daddy, logo);

  return (
    <Box id="spinDaddy" sx={daddy}>
      <motion.img
        id="dragonSpinner"
        src="/dragon_spinner.svg"
        style={{
          rotate: rotate,
          overflow: "hidden",
        }}
      />
      <img src="/kothis.svg" id="logoBG" style={logo} />
    </Box>
  );
}
