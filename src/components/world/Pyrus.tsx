import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Pyrus page loader
}

export default function Pyrus() {
  // Pyrus page

  return (
    <Box sx={{ width: 1, textAlign: "center" }}>
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Pyrus of Draconia
      </Typography>
    </Box>
  );
}
