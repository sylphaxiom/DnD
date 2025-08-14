import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

interface Props {
  current: string;
  onChange: (pg: string) => void;
}

function firstUpper(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function Navigation({ current, onChange }: Props) {
  const pages = [
    "home",
    "characters",
    "campaigns",
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
        onChange={(event: React.SyntheticEvent, nxtPg) => {
          event.preventDefault;
          onChange(nxtPg);
        }}
        value={current}
        centered
      >
        {pages.map((page, index) => (
          <Tab
            LinkComponent={"a"}
            label={firstUpper(page)}
            value={page}
            key={"tab" + index}
            id={"tab" + index}
            href={"#" + page}
            sx={{ height: "13.5vh" }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
