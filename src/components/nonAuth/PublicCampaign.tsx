import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Campaign page loader
}

export default function PublicCampaign() {
  // Campaign page
  const txtHeading = "Campaigns";
  const txtBody = `Here is where you will, one day, find information on running campaigns in the world of Kothis. I'd like to have organizational components here to help coordinate with players and the DM. Perhaps a campaing resources section. A place where you can store documents or maybe even a landing page for each campaign! We will have to see what this becomes.`;

  return (
    <>
      <Divider sx={{ my: 2 }} variant="middle" />
      <Typography variant="h2" sx={{ textAlign: "center", width: 1 }}>
        {txtHeading}
      </Typography>
      <Divider sx={{ my: 2 }} variant="middle" />
      <Typography variant="body1" sx={{ my: 2, textAlign: "center" }}>
        {txtBody}
      </Typography>
    </>
  );
}
