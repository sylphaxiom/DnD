// import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NavLink } from "react-router";
import { useLocation } from "react-router";

export async function clientLoader() {}

export default function Navigation() {
  let location = useLocation();
  const pages = [
    "home",
    "character",
    "campaign",
    "notebook",
    "world",
    "lore",
    "homebrew",
  ];

  return (
    <Box
      sx={{
        height: "100%",
        minWidth: "15%",
        position: "fixed",
        left: 0,
      }}
    >
      <Tabs
        aria-label="nav tabs"
        role="navigation"
        id="navTabRoot"
        orientation="vertical"
        indicatorColor="secondary"
        value={
          location.pathname === "/" ? "home" : location.pathname.substring(1)
        }
        centered
      >
        {pages.map((page, index) => (
          <Tab
            component={NavLink}
            label={page}
            value={page}
            to={page === "home" ? "/" : page}
            aria-controls={page}
            key={"tab-" + index}
            id={"tab-" + index}
            sx={{ height: "13.5vh" }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
