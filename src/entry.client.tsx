import * as React from "react";
import ReactDom from "react-dom/client";
import { HydratedRouter } from "react-router-dom";

ReactDom.hydrateRoot(
  document,
  <React.StrictMode>
    <HydratedRouter
      unstable_onError={(error, errorInfo) => {
        console.error(error, errorInfo);
      }}
    />
  </React.StrictMode>
);
