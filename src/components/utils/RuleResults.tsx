import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import type { Rule } from "../workhorse/Queries";

interface RuProps {
  results: Rule[];
}

export default function FeatResults({ results }: RuProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  console.log("Entered Feat component...");

  const handleChange =
    (key: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? key : false);
    };

  const accordian = ({
    // url,
    key,
    document,
    name,
    desc,
    index,
    initialHeaderLevel,
    ruleset,
  }: Rule) => {
    return (
      <Accordion
        expanded={expanded === key}
        key={key + "-acc"}
        onChange={handleChange(key)}
      >
        <AccordionSummary
          aria-controls={key + "-content"}
          id={key + "-header"}
          key={key + "-header"}
          expandIcon={<ExpandMoreIcon key={key + "-ico"} />}
        >
          <Typography component="h3" key={key + "-name"}>
            {name + " (" + document + ")"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails key={key + "-accDetail"}>
          <Typography key={key + "-desc"}>{desc}</Typography>
          <Divider />
          <Typography key={key + "-ruleset"}>{ruleset}</Typography>
          <Divider />
          <Typography variant="body2" key={key + "-refSection"}>
            {"Index: " + index + " | Header-level: " + initialHeaderLevel}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box sx={{ px: 3 }} key={"rule_box"}>
      {results?.map((item: Rule) => accordian(item))}
    </Box>
  );
}
