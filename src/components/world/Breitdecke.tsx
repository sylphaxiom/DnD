import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Breitdecke page loader
}

export default function Breitdecke() {
  // Breitdecke page

  return (
    <Box sx={{ width: 1, textAlign: "center" }}>
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Breitdecke of The Herzog Kingdom
      </Typography>
    </Box>
  );
}
