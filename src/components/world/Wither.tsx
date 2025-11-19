import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Wither page loader
}

export default function Wither() {
  // Wither page

  return (
    <Box sx={{ width: 1, textAlign: "center" }}>
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Wither of Faena
      </Typography>
    </Box>
  );
}
