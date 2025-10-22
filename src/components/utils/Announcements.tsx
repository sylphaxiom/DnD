import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";

export default function Announcements() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (item: string) => (event: React.SyntheticEvent, newExp: boolean) => {
      event.preventDefault;
      setExpanded(newExp ? item : false);
    };

  const announcements = [
    {
      title: "New Date",
      dm: "Jake",
      content:
        "There's a new date for our next game! Please make sure to check your calendars.",
      date: new Date(2025, 7, 14, 11, 34),
    },
    {
      title: "Get Ready",
      dm: "Tals",
      content: "I'm excited for next session everyone, it's going to be great!",
      date: new Date(2025, 7, 12, 11, 34),
    },
    {
      title: "Next Session",
      dm: "Jake",
      content:
        "For next session, please go over your abilities, there's a lot going on.",
      date: new Date(2025, 7, 11, 11, 34),
    },
    {
      title: "New Player",
      dm: "Jake",
      content:
        "We've got someone new starting next session. Welcome Joe Dirt to the group!",
      date: new Date(2025, 6, 3, 11, 34),
    },
  ];

  const aCount = announcements.length;

  function listMaker(
    index: number,
    title: string,
    dm: string,
    content: string,
    date: Date
  ) {
    const id = "ann" + index;
    const strDate = date.toDateString();
    return (
      <React.Fragment key={index}>
        <Accordion
          expanded={expanded === id}
          onChange={handleChange(id.toString())}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={id}
            id={id + "-header"}
            key={id + "-header"}
          >
            <Avatar children={dm} sx={{ bgcolor: "purple", marginRight: 2 }} />
            <Stack>
              <Typography component={"span"}>{title}</Typography>
              <Typography component={"span"} variant="caption">
                {strDate}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{content}</Typography>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    );
  }

  return (
    <Card variant="outlined" sx={{ minWidth: "80%", m: 3, borderRadius: 10 }}>
      <CardHeader
        title="New Announcements"
        avatar={<Avatar sx={{ bgcolor: "purple" }} children={aCount} />}
        children={aCount}
      />
      <CardContent sx={{ maxHeight: 250, overflowY: "scroll" }}>
        {announcements.map((ann, index) => (
          <List key={"li-" + index}>
            {listMaker(
              index,
              ann.title,
              ann.dm.charAt(0),
              ann.content,
              ann.date
            )}
          </List>
        ))}
      </CardContent>
    </Card>
  );
}
