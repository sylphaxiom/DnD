import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // MakDur page loader
}

export default function MakDur() {
  // MakDur page

  return (
    <Box sx={{ width: 1, textAlign: "center" }} tabIndex={0} role="main">
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Mak-Dur of Rokesh
      </Typography>
    </Box>
  );
}
