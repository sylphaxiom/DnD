import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Notebook page loader
}

export default function PublicNotebook() {
  // Notebook page
  const txtHeading = "Notebook";
  const txtBody = `Here is where players will be able to keep their notes and whatever they want really. There won't be much use for this page if you haven't signed up, but maybe we can put some public session notes or audio clips up here. Who knows?`;

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
