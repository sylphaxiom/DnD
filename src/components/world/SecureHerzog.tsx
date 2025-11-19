import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {
  // Borodir page loader
}

export default function SecureHerzog() {
  // Borodir page but secure

  return (
    <Box sx={{ width: 1, textAlign: "center" }}>
      <Typography variant="h1" sx={{ mx: "auto" }}>
        Secure version of The HerzogEmpire.
      </Typography>
    </Box>
  );
}
