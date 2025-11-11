import * as React from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Title from "./Title";
import Navbar from "./Navbar";
import useMediaQuery from "@mui/material/useMediaQuery";
import Announcements from "../utils/Announcements";
import Login from "../utils/Login";
import AppBar from "@mui/material/AppBar";
import Loading from "../Loading";

export function WaitLayout() {
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
              <CircularProgress color="secondary" sx={{ mx: "auto" }} />
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
                  {/* <Login> goes here but need to fix UI so it works in dropdown.sks */}
                </Grid>
              </Grid>
            </AppBar>
            <CircularProgress color="secondary" sx={{ mx: "auto" }} />
          </>
        )}
      </Box>
    </>
  );
}

type PropsAreEqual<P> = (
  prevProps: Readonly<P>,
  nextProps: Readonly<P>
) => boolean;
const pubPg = ["PublicWeb"];

export const AuthGuard = <P extends {}>(
  component: {
    (props: P): Exclude<React.ReactNode, undefined>;
    displayName?: string;
  },
  propsAreEqual?: PropsAreEqual<P> | false,

  componentName = component.displayName ?? component.name
): {
  (props: P): React.JSX.Element;
  displayName: string;
} => {
  if (component.name in pubPg) {
  }
  function WithAuthHoC(props: P) {
    const { isAuthenticated } = useAuth0();
    if (!isAuthenticated) {
      return <Login />;
    }
    const Component = withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    });

    return (<Component {...props} />) as React.JSX.Element;
  }

  WithAuthHoC.displayName = `WithAuthHoC(${componentName})`;

  let wrappedComponent =
    propsAreEqual === false
      ? WithAuthHoC
      : React.memo(WithAuthHoC, propsAreEqual);

  // copyStaticProperties(component, wrappedComponent);

  return wrappedComponent as typeof WithAuthHoC;
};
