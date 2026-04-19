import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Character page loader
}

export default function PublicCharacter() {
  // Character page
  const txtHeading = "Characters";
  const txtBody = `Here is where you will, one day, find the character builder. I have toyed with the idea of having a few pre-made characters for people to choose from. Perhaps we will do a "character of the month" and spotlight that character here with their backstory and other information.`;

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
