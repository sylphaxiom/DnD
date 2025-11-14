import { ApplyUser } from "./wrappers/AuthGuard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export async function clientLoader() {}

export default function Home() {
  const player = ApplyUser();
  const fname = player?.first_name ?? "New";
  const lname = player?.last_name ?? "Player";
  const uname = player?.username ?? "AnonymousPlayer";
  const email = player?.email ?? "Something_is_wrong@error.me";
  const role = player?.role ?? "player";
  console.log(JSON.stringify(player));
  return (
    <Box>
      <Typography variant="h3">Welcome {fname + " " + lname}</Typography>
      <Typography variant="h6">I also know your username is {uname}</Typography>
      <Typography variant="h3">your email address is {email}</Typography>
      <Typography variant="h6">
        and the role you're assigned is {role}
      </Typography>
    </Box>
  );
}
