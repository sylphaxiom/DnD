// import * as React from "react"
import CardHeader from "@mui/material/CardHeader";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function Login() {
  return (
    <Card>
      <CardContent sx={{ textAlign: "center" }}>
        <CardHeader
          title="Log In"
          subheader="Please log-in to access the world..."
        />
        <LoginButton />
        <LogoutButton />
      </CardContent>
    </Card>
  );
}
