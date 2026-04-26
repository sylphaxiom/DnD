import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // HalfHall page loader
}

export default function HalfHall() {
  // HalfHall page

  return (
    <Box sx={{ width: 1, textAlign: "center" }} tabIndex={0} role="main">
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Half-Hall of the Praetorian Empire
      </Typography>
    </Box>
  );
}
