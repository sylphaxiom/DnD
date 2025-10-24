// import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Title from "./layouts/Title";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Announcements from "./utils/Announcements";
import { Outlet } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";

export default function App() {
  let bps = {
    sm: useMediaQuery("(min-width: 600px)"),
    md: useMediaQuery("(min-width: 900px)"),
    lg: useMediaQuery("(min-width: 1200px)"),
    xl: useMediaQuery("(min-width: 1536px)"),
  };

  return (
    <>
      <Box sx={{ height: "100%", minWidth: "100vw" }}>
        {bps.lg ? (
          <Grid container spacing={0}>
            <Grid size={{ xs: 1, lg: 2 }} id="leftNav">
              <Navbar bps={bps} />
            </Grid>
            <Grid container size={{ xs: 9, lg: 8, xl: 7 }} id="centerBody">
              <Title />
              <Outlet />
            </Grid>
            <Grid
              container
              size={{ xs: 1, lg: 2, xl: 3 }}
              sx={{
                alignContent: "flex-start",
                marginTop: 5,
                overflowY: "auto",
                height: "100vh",
              }}
              id="rightUtils"
            >
              <Announcements bps={bps} />
            </Grid>
          </Grid>
        ) : (
          <>
            <AppBar position="sticky">
              <Grid container spacing={0}>
                <Grid
                  size={2}
                  id="leftNav"
                  sx={{ alignContent: "center", justifyItems: "center" }}
                >
                  <Navbar bps={bps} />
                </Grid>
                <Grid container size={{ xs: 8, lg: 8, xl: 7 }} id="centerBody">
                  <Title />
                </Grid>
                <Grid
                  container
                  size={{ xs: 2, lg: 3 }}
                  id="rightUtils"
                  sx={{ alignContent: "center", justifyItems: "baseline" }}
                >
                  <Announcements bps={bps} />
                </Grid>
              </Grid>
            </AppBar>
            <Outlet />
          </>
        )}
        <Footer />
      </Box>
    </>
  );
}
