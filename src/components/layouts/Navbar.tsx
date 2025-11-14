import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NavLink } from "react-router";
import { useLocation } from "react-router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
interface Props {
  bps: {
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
  };
}

export async function clientLoader() {}

export default function Navigation({ bps }: Props) {
  let location = useLocation();
  const [navAnchorEl, setNavAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const tabSX = {
    height: "100%",
    minWidth: "15%",
    position: "fixed",
    left: 0,
  };
  const menuSX = {
    mx: "auto",
  };

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
    <Box sx={bps.lg ? tabSX : menuSX}>
      {bps.lg ? (
        <Tabs
          aria-label="nav tabs"
          role="navigation"
          id="navTabRoot"
          orientation="vertical"
          indicatorColor="secondary"
          value={
            location.pathname === "/" ? "home" : location.pathname.split("/")[1]
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
            sx={{}}
            aria-label="navigation"
            aria-controls="menu-navigation"
            aria-haspopup="true"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setNavAnchorEl(event.currentTarget);
            }}
            color="inherit"
          >
            <MenuOutlinedIcon fontSize="large" color="secondary" />
          </IconButton>
          <Menu
            id="menu-navigation"
            anchorEl={navAnchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            disableScrollLock
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(navAnchorEl)}
            onClose={() => {
              setNavAnchorEl(null);
            }}
          >
            {pages.map((page, index) => (
              <MenuItem
                component={NavLink}
                children={page}
                to={page === "home" ? "/" : page}
                key={"menu-" + index}
                id={"menu-" + index}
                sx={{}}
              />
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
}
