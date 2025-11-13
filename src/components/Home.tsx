import { useAuth0 } from "@auth0/auth0-react";
import { ApplyUser } from "./wrappers/AuthGuard";

export async function clientLoader() {}

export default function Home() {
  const { user } = useAuth0();
  const player = ApplyUser();
  console.log(
    "useAuth0 user object: %s\nApplyUser user object: %s",
    JSON.stringify(user),
    JSON.stringify(player)
  );
  return <div>{}</div>;
}
