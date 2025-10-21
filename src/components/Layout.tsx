import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Title from "./Title";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Announcements from "./Announcements";
import { Outlet } from "react-router";
import type { Route } from "./+types/Layout";

export async function clientLoader({
  params,
  request,
}: Route.ClientLoaderArgs) {
  // temporary placeholder for potential need for a loader
  console.log(
    "Layout.tsx => clientLoader():\nparams: %s\nrequest: %s",
    JSON.stringify(params),
    JSON.stringify(request)
  );
}

export default function App() {
  const [page, setPage] = React.useState("home");
  const handleSelect = (pg: string) => {
    setPage(pg);
  };

  return (
    <>
      <Box sx={{ height: "100%", minWidth: "100vw" }} position="fixed" top={0}>
        <Grid container spacing={0}>
          <Grid size={2} id="leftNav">
            <Navbar current={page} onChange={handleSelect} />
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
