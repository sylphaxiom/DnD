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

  const components = {
    // h1: ({ ...props }) => <Typography variant="h3" {...props} />,
    // h2: ({ ...props }) => <Typography variant="h4" {...props} />,
    // p: ({ ...props }) => <Typography variant="body1" {...props} />,
    // li: ({ ...props }) => <ListItem {...props} />,
  };

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
            const description = benefit.desc;
            return (
              <>
                <Typography component="span" variant="h4" sx={{}}>
                  {benefit.name}
                </Typography>
                <Divider />
                <Markdown components={components} remarkPlugins={[remarkGfm]}>
                  {description}
                </Markdown>
                <br />
              </>
            );
          })}
          <Typography variant="body2">
            <a href={document.permalink}>{document.gamesystem.name}</a>
            {" - "}
            {document.display_name}
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
