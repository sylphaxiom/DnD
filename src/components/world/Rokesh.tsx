import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Rokesh page loader
}

export default function Rokesh() {
  // Rokesh page

  return (
    <Box sx={{ width: 1, textAlign: "center" }} tabIndex={0} role="main">
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Rokesh of Kothis
      </Typography>
    </Box>
  );
}
