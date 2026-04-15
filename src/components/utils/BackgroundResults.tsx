import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MuiMarkdown from "mui-markdown";
import * as React from "react";
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
      <Accordion expanded={expanded === key} onChange={handleChange(key)}>
        <AccordionSummary
          aria-controls={key + "-content"}
          id={key + "-header"}
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography component="h3">{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{desc}</Typography>
          {benefits.map((benefit: BackgroundBenefit) => {
            return (
              <>
                <Typography component="span" sx={{}}>
                  {benefit.name}
                </Typography>
                <MuiMarkdown>{benefit.desc}</MuiMarkdown>
              </>
            );
          })}
          <Typography component="small">
            {document.gamesystem.name + " - " + document.display_name}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  };

  return (
    <Box sx={{ px: 3 }}>
      {results?.map((item: Background) => accordian(item))}
    </Box>
  );
}
