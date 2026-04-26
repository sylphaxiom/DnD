import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Draconia page loader
}

export default function Draconia() {
  // Draconia page

  return (
    <Box sx={{ width: 1, textAlign: "center" }} tabIndex={0} role="main">
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Draconia of Kothis
      </Typography>
    </Box>
  );
}
