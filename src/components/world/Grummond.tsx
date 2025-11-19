import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Grummond page loader
}

export default function Grummond() {
  // Grummond page

  return (
    <Box sx={{ width: 1, textAlign: "center" }}>
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Grummond of The Herzog Kingdom
      </Typography>
    </Box>
  );
}
