import * as React from "react";
import ReactDom from "react-dom/client";
import { HydratedRouter } from "react-router-dom";
import { Auth0Provider, type AppState } from "@auth0/auth0-react";
import { redirectDocument } from "react-router";

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
        redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
      }}
      useRefreshTokens={true}
      onRedirectCallback={() => {
        onRedirectCallback;
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
