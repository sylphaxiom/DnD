// import * as React from "react";
import Box from "@mui/material/Box";
import Login from "../utils/Login";

export async function clientLoader() {}

export default function Utils() {
  return (
    <Box
      sx={{
        height: "100%",
        minWidth: "15%",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        right: 0,
        top: 0,
      }}
      id="utilBox"
    >
      <Login />
    </Box>
  );
}
