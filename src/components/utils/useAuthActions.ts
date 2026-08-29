import { useAuth0 } from "@auth0/auth0-react";
import { useLocation, useNavigate } from "react-router";

export type AuthAction = "Log In" | "Log Out" | "Sign Up" | "Profile";

/**
 * Shared login/logout/sign-up/profile actions, previously duplicated (and
 * drifted) between the SpeedDial (Login.tsx) and the AppBar menu
 * (Layout.tsx).
 */
export function useAuthActions(domain: string) {
  const { loginWithRedirect, logout } = useAuth0();
  const location = useLocation();
  const navigate = useNavigate();

  return async function handleAuthAction(action: AuthAction) {
    switch (action) {
      case "Log In":
        await loginWithRedirect({
          appState: { returnTo: domain + location.pathname },
        });
        break;
      case "Log Out":
        // TODO(jacob): the two implementations this replaces disagreed here —
        // Layout.tsx's mobile/tablet menu called localStorage.clear() and
        // returned to the current page; Login.tsx's SpeedDial did neither
        // and returned to "/". Defaulting to the SpeedDial's less
        // destructive behavior below; confirm this is what you want for
        // both breakpoints.
        await logout({ logoutParams: { returnTo: domain + "/" } });
        break;
      case "Sign Up":
        await loginWithRedirect({
          appState: { returnTo: domain + location.pathname },
          authorizationParams: { screen_hint: "signup" },
        });
        break;
      case "Profile":
        navigate("/notebook/profile");
        break;
    }
  };
}
