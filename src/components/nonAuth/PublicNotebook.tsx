import Typography from "@mui/material/Typography";
import { Outlet } from "react-router";

export async function clientLoader() {
  // Notebook page loader
}

export default function PublicNotebook() {
  // Notebook page

  return (
    <>
      <Typography variant="h1" sx={{ textAlign: "center", width: 1 }}>
        Notebook
      </Typography>
      <Outlet />
    </>
  );
}
