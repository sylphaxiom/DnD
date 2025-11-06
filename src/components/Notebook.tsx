import Typography from "@mui/material/Typography";
import { Outlet } from "react-router";
import type { Route } from "./+types/Notebook";

export async function clientLoader({}: Route.ClientLoaderArgs) {
  // Notebook page loader
}

export default function Notebook() {
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
