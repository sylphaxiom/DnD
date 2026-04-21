import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider, List } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import type { Reference } from "../workhorse/Queries";

interface DoProps {
  results: Reference[];
}

export default function ReferenceResults({ results }: DoProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (key: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? key : false);
    };

  const accordian = ({
    key,
    licenses,
    publisher,
    gamesystem,
    display_name,
    name,
    desc,
    author,
    publication_date,
    permalink,
  }: Reference) => {
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
            {display_name + " (" + gamesystem.key + ")"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails key={key + "-accDetail"}>
          <Typography variant="body1" key={key + "-desc"}>
            {desc}
          </Typography>
          <br key={key + "-br0"} />
          <Divider key={key + "-div0"} />
          <br key={key + "-br1"} />
          <Typography
            key={key + "-cited"}
            sx={{ textDecoration: "3em hanging" }}
          >
            {author + " (" + publication_date?.split("-")[0] + "). "}
            <Typography
              component={"i"}
              sx={{ textIndent: "unset", fontStyle: "italic", fontSize: "1em" }}
              key={key + "-title"}
            >
              {name + ". "}
            </Typography>
            <a href={permalink} key={key + "-citeLink"}>
              {publisher.name + ". " + permalink}
            </a>
          </Typography>
          {licenses.map((license: { name: string; key: string }) => {
            return (
              <List key={license.name + "-frag"}>
                <Typography
                  component="span"
                  variant="body1"
                  key={key + "-" + license}
                >
                  {"Licenses:  "}
                  {license.name}
                </Typography>
                <Divider key={key + "-" + license + "-div1"} />
                <br key={key + "-br2"} />
              </List>
            );
          })}
          <Typography variant="body2" key={key + "-refSection"}>
            <a href={permalink} key={key + "-refA"}>
              {gamesystem.name}
            </a>
            {" - "}
            {display_name}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box sx={{ px: 3 }} key={"benefit_box"}>
      {results?.map((item: Reference) => accordian(item))}
    </Box>
  );
}
