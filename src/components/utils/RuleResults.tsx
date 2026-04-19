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
import type { Rule, Ruleset } from "../workhorse/Queries";

interface RuProps {
  results: Ruleset[];
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
    rules,
  }: Ruleset) => {
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
          <Markdown remarkPlugins={[remarkGfm]} key={key + "-" + "-md"}>
            {desc}
          </Markdown>
          <Divider />
          {rules.map((rule: Rule) => {
            const description = rule.desc;
            return (
              <React.Fragment key={rule.name + "-frag"}>
                <Typography
                  component="span"
                  variant="h4"
                  key={key + "-" + rule}
                >
                  {rule.name}
                </Typography>
                <Divider key={key + "-" + rule + "-divider"} />
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  key={key + "-" + rule + "-md"}
                >
                  {description}
                </Markdown>
                <br key={key + "-br"} />
              </React.Fragment>
            );
          })}
          <Divider />
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
    <Box sx={{ px: 3 }} key={"rule_box"}>
      {results?.map((item: Ruleset) => accordian(item))}
    </Box>
  );
}
