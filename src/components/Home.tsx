import * as React from "react";
import Box from "@mui/material/Box";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "./Loading";
import { fetchPlayer } from "./calls/Queries";
import { useQuery } from "@tanstack/react-query";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

export default withAuthenticationRequired(Home, {
  onRedirecting: () => <Loading />,
});

export function Home() {
  const [value, setValue] = React.useState("characters");
  const { user, isAuthenticated } = useAuth0();
  console.log("User info is: " + JSON.stringify(user));
  const { isLoading, data, error } = useQuery({
    queryKey: ["getPlayer", user?.preferred_username, user?.email],
    queryFn: () =>
      fetchPlayer(isAuthenticated, user?.preferred_username, user?.email),
  });
  const player = data?.message[0];
  const handleChange = (e: React.SyntheticEvent, val: string) => {
    e.preventDefault();
    setValue(val);
  };
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.log(
      "Something went wrong here.\nError message: %s\nReturned Data: %s",
      JSON.stringify(error.message),
      JSON.stringify(data)
    );
  }
  return (
    <>
      <Typography
        variant="h5"
        sx={{ width: 0.8, mx: "auto", my: 3, textAlign: "center" }}
      >
        Hey {player?.first_name}, This is the homepage. Here you will be able to
        get an overview of all your stuff...{" "}
      </Typography>
      <Typography
        variant="h5"
        sx={{ width: 0.8, mx: "auto", my: 3, textAlign: "center" }}
      >
        Once I figure out what all that stuff is that is.
      </Typography>
      <Box>
        <Tabs
          value={value}
          variant="fullWidth"
          textColor="secondary"
          indicatorColor="secondary"
          onChange={(e, value) => handleChange(e, value)}
        >
          <Tab
            label="Characters"
            value="characters"
            id="char_tab"
            aria-controls="char_panel"
          />
          <Tab
            label="Campaigns"
            value="campaigns"
            id="camp_tab"
            aria-controls="camp_panel"
          />
          <Tab
            label="Players"
            value="players"
            id="play_tab"
            aria-controls="play_panel"
          />
          <Tab
            label="Updates"
            value="updates"
            id="update_tab"
            aria-controls="update_panel"
          />
        </Tabs>
      </Box>
      <TabPanel value="character" id="char_panel"></TabPanel>
      <TabPanel value="campaigns" id="camp_panel"></TabPanel>
      <TabPanel value="players" id="play_panel"></TabPanel>
      <TabPanel value="updates" id="update_panel"></TabPanel>
    </>
  );
}
