import { withAuthenticationRequired } from "@auth0/auth0-react";
import type { ComponentType } from "react";
import { AUTH0_CONNECTION_ID } from "../../config/auth";
import Thinking from "./Thinking";

export interface WithSecuredOptions {
  /** Override the default Auth0 connection; most call sites should omit this. */
  connection?: string;
  onRedirecting?: () => JSX.Element;
}

export function withSecured<P extends object>(
  Component: ComponentType<P>,
  options?: WithSecuredOptions,
): ComponentType<P> {
  return withAuthenticationRequired(Component, {
    onRedirecting: options?.onRedirecting ?? (() => <Thinking />),
    loginOptions: {
      authorizationParams: {
        connection: options?.connection ?? AUTH0_CONNECTION_ID,
      },
    },
  });
}
