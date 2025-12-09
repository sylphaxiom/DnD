import * as React from "react";
import { type Player } from "./Queries";
import ErrorForm from "../forms/ErrorForm";
interface Props {
  children: React.ReactNode;
  player: Player;
}
export function PlayerForm({ children, player }: Props) {
  const role = player.role;
  let authorized = false;
  switch (role) {
    case "admin":
    case "dm":
    case "homebrewer":
    case "player":
      console.log("Permission Granted");
      authorized = true;
      break;
    default:
      console.log("Permission Denied");
      authorized = false;
  }
  if (authorized) {
    return children;
  } else {
    const error_type = "AuthRoleError";
    const description = `Sorry, ${player.first_name}, but you aren't authorized for this form.`;
    console.log(description);
    return <ErrorForm error_type={error_type} description={description} />;
  }
}

export function HomebrewerForm({ children, player }: Props) {
  const role = player.role;
  let authorized = false;
  switch (role) {
    case "admin":
    case "dm":
    case "homebrewer":
      console.log("Permission Granted");
      authorized = true;
      break;
    case "player":
    default:
      console.log("Permission Denied");
      authorized = false;
  }
  if (authorized) {
    return children;
  } else {
    const error_type = "AuthRoleError";
    const description = `Sorry, ${player.first_name}, but you aren't authorized for this form.`;
    console.log(description);
    return <ErrorForm error_type={error_type} description={description} />;
  }
}

export function DMForm({ children, player }: Props) {
  const role = player.role;
  let authorized = false;
  switch (role) {
    case "admin":
    case "dm":
      console.log("Permission Granted");
      authorized = true;
      break;
    case "homebrewer":
    case "player":
    default:
      console.log("Permission Denied");
      authorized = false;
  }
  if (authorized) {
    return children;
  } else {
    const error_type = "AuthRoleError";
    const description = `Sorry, ${player.first_name}, but you aren't authorized for this form.`;
    console.log(description);
    return <ErrorForm error_type={error_type} description={description} />;
  }
}

export function AdminForm({ children, player }: Props) {
  const role = player.role;
  let authorized = false;
  switch (role) {
    case "admin":
      console.log("Permission Granted");
      authorized = true;
      break;
    case "dm":
    case "homebrewer":
    case "player":
    default:
      console.log("Permission Denied");
      authorized = false;
  }
  if (authorized) {
    return children;
  } else {
    const error_type = "AuthRoleError";
    const description = `Sorry, ${player.first_name}, but you aren't authorized for this form.`;
    console.log(description);
    return <ErrorForm error_type={error_type} description={description} />;
  }
}
