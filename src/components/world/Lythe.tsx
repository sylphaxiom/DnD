import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Lythe page loader
}

export default function Lythe() {
  // Lythe page

  return (
    <Box sx={{ width: 1, textAlign: "center" }}>
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Lythe of Faena
      </Typography>
    </Box>
  );
}
