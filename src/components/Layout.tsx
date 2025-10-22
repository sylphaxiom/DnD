// import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Title from "./layouts/Title";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Announcements from "./utils/Announcements";
import { Outlet } from "react-router";

export default function App() {
  return (
    <>
      <Box sx={{ height: "100%", minWidth: "100vw" }} position="fixed" top={0}>
        <Grid container spacing={0}>
          <Grid size={2} id="leftNav">
            <Navbar />
          </Grid>
          <Grid container size={7} id="centerBody">
            <Title />
            <Outlet />
          </Grid>
          <Grid container size={3} id="rightUtils">
            <Announcements />
          </Grid>
        </Grid>
        <Footer />
      </Box>
    </>
  );
}
