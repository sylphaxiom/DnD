import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Announcement from "@mui/icons-material/Announcement";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
interface Props {
  bps: {
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
  };
}

export default function Announcements({ bps }: Props) {
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handleChange =
    (item: string) => (event: React.SyntheticEvent, newExp: boolean) => {
      event.preventDefault;
      setExpanded(newExp ? item : false);
    };

  const [annAnchorEl, setAnnAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  // Temporary until DB connection is implemented.
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
  const theme = useTheme();
  const aCount = announcements.length;
  const icon = <Announcement fontSize="large" />;
  const str = "Announcements";
  function listMaker(
    ann: {
      title: string;
      dm: string;
      content: string;
      date: Date;
    },
    index: number
  ) {
    const title = ann.title;
    const id = "ann" + index;
    const strDate = ann.date.toDateString();
    return (
      <React.Fragment key={index}>
        <Accordion
          expanded={expanded === id}
          onChange={handleChange(id.toString())}
          sx={{ maxWidth: "100%" }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={id}
            id={id + "-header"}
            key={id + "-header"}
          >
            <Avatar
              children={ann.dm.charAt(0)}
              sx={{ bgcolor: theme.palette.secondary.main, marginRight: 2 }}
            />
            <Stack>
              <Typography component={"span"}>{title}</Typography>
              <Typography component={"span"} variant="caption">
                {strDate}
              </Typography>
            </Stack>
          </AccordionSummary>
          <AccordionDetails sx={{ textWrap: "wrap" }}>
            <Typography>{ann.content}</Typography>
          </AccordionDetails>
        </Accordion>
      </React.Fragment>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        textAlign: "center",
        alignSelf: "center",
      }}
    >
      {bps.xl ? (
        <Card
          variant="outlined"
          sx={{
            minWidth: "150px",
            m: 3,
            borderRadius: 10,
          }}
        >
          <CardHeader
            slotProps={{
              title: {
                fontSize: "1.6em",
                color: theme.palette.secondary.main,
              },
            }}
            title={!bps.xl ? icon : str}
            avatar={
              <Avatar
                sx={{ bgcolor: theme.palette.secondary.main }}
                children={aCount}
              />
            }
            children={aCount}
            action={
              <IconButton
                aria-label="close"
                onClick={() => {
                  setIsOpen(!isOpen);
                }}
              >
                {isOpen ? (
                  <ExpandMore color="secondary" />
                ) : (
                  <ExpandLess color="secondary" />
                )}
              </IconButton>
            }
          />
          <Collapse in={isOpen} timeout="auto" unmountOnExit>
            <CardContent sx={{ maxHeight: 250, padding: 0 }}>
              {announcements.map((ann, index) => (
                <List sx={{ padding: 0 }} key={"li-" + index}>
                  {listMaker(ann, index)}
                </List>
              ))}
            </CardContent>
          </Collapse>
        </Card>
      ) : (
        <>
          <IconButton
            size="large"
            sx={{}}
            aria-label="announcements"
            aria-controls="announcements"
            aria-haspopup="true"
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              setAnnAnchorEl(e.currentTarget);
            }}
            color="secondary"
          >
            <Badge badgeContent={aCount} color="primary">
              <Announcement fontSize="large" />
            </Badge>
          </IconButton>
          <Menu
            id="announcements"
            anchorEl={annAnchorEl}
            slotProps={{
              list: {
                disablePadding: true,
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(annAnchorEl)}
            onClose={() => {
              setAnnAnchorEl(null);
            }}
          >
            {announcements.map((ann, index) => (
              <MenuItem
                key={"li-" + index}
                sx={{ padding: 0, maxWidth: "400px" }}
              >
                {listMaker(ann, index)}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </Box>
  );
}
