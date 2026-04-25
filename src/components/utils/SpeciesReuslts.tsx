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
import type { Species, Trait } from "../workhorse/Queries";

interface SpProps {
  results: Species[];
  page: number;
  limit: number;
}

interface ParentSpecies extends Species {
  subspecies: Species[];
}

export default function SpeciesResults({ results, page, limit }: SpProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [subExpanded, setSubExpanded] = React.useState<string | false>(false);

  const handleChange =
    (key: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? key : false);
    };
  const handleSubChange =
    (key: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setSubExpanded(newExpanded ? key : false);
    };

  let parentSpecies: ParentSpecies[] = [];
  results.forEach((species) => {
    if (!species.is_subspecies) {
      const children = results.filter(
        (item: Species) => item.subspecies_of === species.key,
      );
      parentSpecies.push({ ...species, subspecies: children });
    }
  });

  const start = (page - 1) * limit;
  const end = start + limit;
  parentSpecies = parentSpecies.slice(start, end);
  console.log("Fitered feats returned: %i", parentSpecies.length);

  const accordian = ({
    key,
    document,
    traits,
    name,
    desc,
    subspecies,
  }: ParentSpecies) => {
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
          <Markdown remarkPlugins={[remarkGfm]} key={key + "-desc-md"}>
            {desc}
          </Markdown>
          {traits
            .sort((a, b) => a.order - b.order)
            .map((trait: Trait) => {
              const description = trait.desc;
              return (
                <React.Fragment key={trait.name + "-frag"}>
                  <Typography
                    component="span"
                    variant="h4"
                    key={key + "-" + trait.name}
                  >
                    {trait.name}
                    {trait.type ? " (" + trait.type + ")" : null}
                  </Typography>
                  <Divider key={key + "-" + trait.name + "-divider"} />
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    key={key + "-" + trait.name + "-md"}
                  >
                    {description}
                  </Markdown>
                  <br key={key + "-br"} />
                </React.Fragment>
              );
            })}
          <Divider key={key + "-sub-top-div"} />
          {subspecies.map(({ key, traits, name, desc }: Species) => {
            return (
              <Accordion
                expanded={subExpanded === key}
                key={key + "-acc"}
                onChange={handleSubChange(key)}
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
                  <Markdown remarkPlugins={[remarkGfm]} key={key + "-desc-md"}>
                    {desc}
                  </Markdown>
                  {traits
                    .sort((a, b) => a.order - b.order)
                    .map((trait: Trait) => {
                      const description = trait.desc;
                      return (
                        <React.Fragment key={trait.name + "-frag"}>
                          <Typography
                            component="span"
                            variant="h4"
                            key={key + "-" + trait.name}
                          >
                            {trait.name}
                            {trait.type ? " (" + trait.type + ")" : null}
                          </Typography>
                          <Divider key={key + "-" + trait.name + "-divider"} />
                          <Markdown
                            remarkPlugins={[remarkGfm]}
                            key={key + "-" + trait.name + "-md"}
                          >
                            {description}
                          </Markdown>
                          <br key={key + "-br"} />
                        </React.Fragment>
                      );
                    })}
                </AccordionDetails>
              </Accordion>
            );
          })}
          <Divider key={key + "-sub-bot-div"} />
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
    <Box sx={{ px: 3 }} key={"species_box"}>
      {parentSpecies?.map((item: ParentSpecies) => accordian(item))}
    </Box>
  );
}
