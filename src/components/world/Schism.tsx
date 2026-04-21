import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Schism page loader
}

export default function Schism() {
  // Schism page

  return (
    <Box sx={{ width: 1, textAlign: "center" }} tabIndex={0} role="main">
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Schism of The Praetorian Empire
      </Typography>
    </Box>
  );
}
