import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Wildlands page loader
}

export default function Wildlands() {
  // Wildlands page

  return (
    <Box sx={{ width: 1, textAlign: "center" }} tabIndex={0} role="main">
      <Typography variant="h1" sx={{ mx: "auto" }}>
        The Wildlands of Kothis
      </Typography>
    </Box>
  );
}
