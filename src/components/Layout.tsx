import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Title from "./layouts/Title";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Announcements from "./utils/Announcements";
import { Outlet } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import AppBar from "@mui/material/AppBar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";

export default function App() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  let mdBP = useMediaQuery("(min-width: 1200px)");

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ height: "100%", minWidth: "100vw" }} position="fixed" top={0}>
        {mdBP ? (
          <Grid container spacing={0}>
            <Grid size={{ xs: 1, lg: 2 }} id="leftNav">
              <Navbar />
            </Grid>
            <Grid container size={{ xs: 9, lg: 8, xl: 7 }} id="centerBody">
              <Title />
              <Outlet />
            </Grid>
            <Grid container size={{ xs: 1, lg: 2, xl: 3 }} id="rightUtils">
              <Announcements />
            </Grid>
          </Grid>
        ) : (
          <>
            <AppBar position="sticky">
              <Grid container spacing={0}>
                <Grid size={2} id="leftNav">
                  <Navbar />
                </Grid>
                <Grid container size={{ xs: 9, lg: 8, xl: 7 }} id="centerBody">
                  <Title />
                </Grid>
                <Grid container size={{ xs: 1, lg: 2, xl: 3 }} id="rightUtils">
                  <Announcements />
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
