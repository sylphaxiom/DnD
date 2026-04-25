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
}

interface ParentSpecies extends Species {
  subspecies: Species[];
}

export default function SpeciesResults({ results }: SpProps) {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (key: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? key : false);
    };
  let parentSpecies: ParentSpecies[] = [];
  results.forEach((species, _i, res) => {
    if (!species.is_subspecies) {
      const children = res.filter((i) => i.subspecies_of === species.key);
      if (children) {
        parentSpecies.push({ ...species, subspecies: children });
      }
    }
  });

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
          {subspecies && (
            <>
              <Divider key={key + "-sub-top-div"} />
              {subspecies.map(({ key, traits, name, desc }: Species) => {
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
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      key={key + "-desc-md"}
                    >
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
                            <Divider
                              key={key + "-" + trait.name + "-divider"}
                            />
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
                </Accordion>;
              })}
              <Divider key={key + "-sub-bot-div"} />
            </>
          )}
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
