import { withAuthenticationRequired } from "@auth0/auth0-react";
import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Title from "./Title";
import Navbar from "./Navbar";
// import useMediaQuery from "@mui/material/useMediaQuery";
import Announcements from "../utils/Announcements";
import Login from "../utils/Login";
import AppBar from "@mui/material/AppBar";

export function WaitLayout() {
  let bps = {
    sm: true,
    md: true,
    lg: true,
    xl: true,
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
              <CircularProgress />
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
              <Login />
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
            <CircularProgress />
          </>
        )}
      </Box>
    </>
  );
}

export const AuthGuard = (component: React.ComponentType) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => <WaitLayout />,
  });

  return <Component />;
};
