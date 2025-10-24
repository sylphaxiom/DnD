import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Praetor page loader
}

export default function Praetor() {
  // Praetor page

  return (
    <Box sx={{ width: 1, textAlign: "center" }}>
      <Typography variant="h1" sx={{ mx: "auto" }}>
        The Praetor of Kothis
      </Typography>
    </Box>
  );
}
