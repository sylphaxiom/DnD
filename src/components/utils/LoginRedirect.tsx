import { withSecured } from "./withSecured";

// withAuthenticationRequired (via withSecured) triggers loginWithRedirect()
// before this ever renders, so an unauthenticated visit to /login goes
// straight to the real Auth0 login flow (correct PKCE/state handling, unlike
// the old manual /authorize redirect this replaces).
// TODO(jacob): decide what an already-authenticated visitor to /login should
// see instead of a blank page — e.g. redirect them to "/".
function LoginRedirect() {
  return null;
}

export default withSecured(LoginRedirect);
