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
import type { Background, BackgroundBenefit } from "../workhorse/Queries";

interface BgProps {
  results: Background[];
}

export default function BackgroundResults({ results }: BgProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (key: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? key : false);
    };

  const accordian = ({
    // url,
    key,
    benefits,
    document,
    name,
    desc,
  }: Background) => {
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
            {name + " (" + document.gamesystem.key + ")"}
          </Typography>
        </AccordionSummary>
        <AccordionDetails key={key + "-accDetail"}>
          <Typography key={key + "-desc"}>{desc}</Typography>
          {benefits.map((benefit: BackgroundBenefit) => {
            const description = benefit.desc;
            return (
              <React.Fragment key={benefit.name + "-frag"}>
                <Typography
                  component="span"
                  variant="h4"
                  key={key + "-" + benefit}
                >
                  {benefit.name}
                </Typography>
                <Divider key={key + "-" + benefit + "-divider"} />
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  key={key + "-" + benefit + "-md"}
                >
                  {description}
                </Markdown>
                <br key={key + "-br"} />
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
    <Box sx={{ px: 3 }} key={"benefit_box"}>
      {results?.map((item: Background) => accordian(item))}
    </Box>
  );
}
