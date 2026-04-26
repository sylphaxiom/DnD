// import * as React from "react";
import Box from "@mui/material/Box";
import Login from "../utils/Login";
import ModeSwitch from "../utils/ModeSwitch";

export async function clientLoader() {}

export default function Utils() {
  return (
    <Box
      sx={{
        height: "100%",
        minWidth: "8%",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right: 0,
        top: 0,
      }}
      id="utilBox"
      role="complementary"
      aria-label="utility panel"
    >
      <ModeSwitch />
      <Login />
    </Box>
  );
}
