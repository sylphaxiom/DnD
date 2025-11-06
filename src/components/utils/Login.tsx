// import * as React from "react"
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import type { Route } from "./+types/Login";
import { redirectDocument, useLocation } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";

export function LoginButton() {
  const { loginWithRedirect } = useAuth0();
  const handleLogin = async () => {
    await loginWithRedirect({
      appState: { returnTo: "/notebook/profile" },
    });
  };
  return (
    <button onClick={handleLogin} className="button login">
      Log In
    </button>
  );
}

export function SignUpButton() {
  const { loginWithRedirect } = useAuth0();
  const handleSignup = async () => {
    await loginWithRedirect({
      appState: { returnTo: "/notebook/profile" },
      authorizationParams: { screen_hint: "signup" },
    });
  };
  return (
    <button onClick={handleSignup} className="button signup">
      Sign Up
    </button>
  );
}

export function LogoutButton() {
  const { logout } = useAuth0();
  const handleLogout = async () => {
    await logout({ logoutParams: { returnTo: "http://localhost:5173/" } });
  };
  return (
    <button onClick={handleLogout} className="button logout">
      Log Out
    </button>
  );
}

export async function clientLoader({
  request,
  params,
}: Route.ClientLoaderArgs) {
  console.log(
    "in Login loader\nrequest is: %s\nparams is: %s",
    JSON.stringify(request),
    JSON.stringify(params)
  );
}

export default function Login() {
  const location = useLocation();
  const { isAuthenticated } = useAuth0();
  if (location.pathname === "/login") {
    console.log("login path located, redirecting to /authorize endpoint");
    redirectDocument("auth.kothis.sylphaxiom.com/authorize");
  }
  return (
    <Card>
      <CardContent sx={{ textAlign: "center" }}>
        <CardHeader
          title="Log In"
          subheader="Please log-in to access the world..."
        />
        {!isAuthenticated ? (
          <>
            <LoginButton />
            <br />
            <SignUpButton />
          </>
        ) : (
          <LogoutButton />
        )}
      </CardContent>
    </Card>
  );
}
