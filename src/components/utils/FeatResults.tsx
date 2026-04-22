import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { fTypes } from "../forms/Filters";
import type { Feat, FeatBenefit } from "../workhorse/Queries";

interface FtProps {
  results: Feat[];
  featType: fTypes[];
  prereqs: string[];
  countMod?: React.Dispatch<React.SetStateAction<number>>;
}

export default function FeatResults({ results }: FtProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (key: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? key : false);
    };

  const accordian = ({
    key,
    benefits,
    document,
    name,
    desc,
    has_prerequisite,
    prerequisite,
    type,
  }: Feat) => {
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
            {name + " (" + type + ")"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails key={key + "-accDetail"}>
          <Typography
            key={key + "-prereq-desc"}
            sx={{ display: has_prerequisite ? "flex" : "none" }}
          >
            {"Prequisite: " + prerequisite}
          </Typography>
          <Divider />
          <Typography key={key + "-desc"}>{desc}</Typography>
          <Divider />
          <Typography key={key + "-benefit"}>{"Benefits"}</Typography>
          <Divider />
          {benefits.map((benefit: FeatBenefit) => {
            const description = benefit.desc;
            return (
              <React.Fragment key={key + "-" + benefit.desc + "-frag"}>
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  key={key + "-" + benefit.desc + "-md"}
                >
                  {description}
                </Markdown>
                <br />
              </React.Fragment>
            );
          })}
          <Typography variant="body2" key={key + "-refSection"}>
            <a href={document.permalink} key={key + "-refA"}>
              {document.gamesystem.name}
            </a>
            {" - "}
            {document.display_name}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box sx={{ px: 3 }} key={"feat_box"}>
      {results?.map((item: Feat) => accordian(item))}
    </Box>
  );
}
