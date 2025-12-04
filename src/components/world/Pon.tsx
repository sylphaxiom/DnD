import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Pon page loader
}

export default function Pon() {
  // Pon page

  return (
    <Box sx={{ width: 1, textAlign: "center" }}>
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Pon of The Wildlands
      </Typography>
    </Box>
  );
}
