import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Homebrew page loader
}

export default function PublicHomebrew() {
  // Homebrew page
  const txtHeading = "Homebrewery";
  const txtBody = `Here is where you will, one day, find the homebrew items and rules we have created. Perhaps there will even be an item or feat builder on here. If we can ever agree on balancing rules, that is.`;

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
