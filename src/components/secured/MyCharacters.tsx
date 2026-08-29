import Typography from "@mui/material/Typography";
import { withSecured } from "../utils/withSecured";

export async function clientLoader() {
  // Character page loader
}

function PublicCharacter() {
  // Character page

  return (
    <Typography variant="h3" sx={{ textAlign: "center", width: 1 }}>
      {"My Characters (secured)"}
    </Typography>
  );
}

export default withSecured(PublicCharacter);
