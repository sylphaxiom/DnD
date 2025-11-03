import * as React from "react";
import ReactDom from "react-dom/client";
import { HydratedRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDom.hydrateRoot(
  document,
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: "http://localhost:5173/",
      }}
    >
      <HydratedRouter
        unstable_onError={(error, errorInfo) => {
          console.error(error, errorInfo);
        }}
      />
    </Auth0Provider>
  </React.StrictMode>
);
