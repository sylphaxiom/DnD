import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NavLink } from "react-router";
import { useLocation } from "react-router";
import useMediaQuery from "@mui/material/useMediaQuery";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export async function clientLoader() {}

export default function Navigation() {
  let location = useLocation();
  const [navAnchorEl, setNavAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const handleNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setNavAnchorEl(event.currentTarget);
  };
  const handleNavClose = () => {
    setNavAnchorEl(null);
  };
  let mdBP = useMediaQuery("(min-width: 1200px)");

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
      {mdBP ? (
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
      ) : (
        <>
          <IconButton
            size="large"
            aria-label="navigation"
            aria-controls="menu-appbarNav"
            aria-haspopup="true"
            onClick={handleNavMenu}
            color="inherit"
          >
            <MenuOutlinedIcon />
          </IconButton>
          <Menu
            id="menu-navigation"
            anchorEl={navAnchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={Boolean(navAnchorEl)}
            onClose={handleNavClose}
          >
            {pages.map((page, index) => (
              <MenuItem
                component={NavLink}
                to={page === "home" ? "/" : page}
                key={"menu-" + index}
                id={"menu-" + index}
                sx={{ height: "13.5vh" }}
              />
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
}
