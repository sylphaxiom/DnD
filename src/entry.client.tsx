import { Auth0Provider, type AppState } from "@auth0/auth0-react";
import * as React from "react";
import ReactDom from "react-dom/client";
import { redirectDocument } from "react-router";
import { HydratedRouter } from "react-router-dom";

const onRedirectCallback = (appState: AppState) => {
  return redirectDocument(appState?.returnTo || window.location.pathname);
};

ReactDom.hydrateRoot(
  document,
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL_D,
        audience: "https://kothis.sylphaxiom.com/api/v1/",
      }}
      useRefreshTokens
      useRefreshTokensFallback
      cacheLocation="localstorage"
      onRedirectCallback={() => onRedirectCallback}
    >
      <HydratedRouter
        onError={(error, errorInfo) => {
          console.error(error, errorInfo);
        }}
      />
    </Auth0Provider>
  </React.StrictMode>,
);
