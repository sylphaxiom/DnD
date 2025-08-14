import * as React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import CssBaseline from "@mui/material/CssBaseline";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React.Fragment>
      <CssBaseline />
      <App />
    </React.Fragment>
  </React.StrictMode>
);
