import { Auth0Provider, type AppState } from "@auth0/auth0-react";
import * as React from "react";
import ReactDom from "react-dom/client";
import { HydratedRouter } from "react-router-dom";
import {
  AUTH0_CALLBACK_URL,
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
} from "./config/auth";

const onRedirectCallback = (appState?: AppState) => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname,
  );
};

ReactDom.hydrateRoot(
  document,
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: AUTH0_CALLBACK_URL,
        audience: "https://kothis.sylphaxiom.com/api/v1/",
      }}
      useRefreshTokens
      useRefreshTokensFallback
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      <HydratedRouter
        onError={(error, errorInfo) => {
          console.error(error, errorInfo);
        }}
      />
    </Auth0Provider>
  </React.StrictMode>,
);
