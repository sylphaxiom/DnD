import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Dramir page loader
}

export default function Dramir() {
  // Dramir page

  return (
    <Box sx={{ width: 1, textAlign: "center" }} tabIndex={0} role="main">
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Dramir of Kothis
      </Typography>
    </Box>
  );
}
