import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Copyright from "@mui/icons-material/Copyright";
import Facebook from "@mui/icons-material/Facebook";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon, faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

export default function Footer() {
  return (
    <Grid
      container
      id="footRoot"
      sx={{
        maxWidth: "75vw",
        paddingTop: "100px",
        mx: "auto",
      }}
    >
      <Grid size={4}>
        <Stack>
          <Typography variant="caption" sx={{ textAlign: "center" }}>
            External Links
          </Typography>
          <Divider variant="middle" sx={{ width: 0.3, mx: "auto" }} />
          <Divider variant="middle" sx={{ width: 0.22, mx: "auto", mt: 0.5 }} />
          <Divider variant="middle" sx={{ width: 0.15, mx: "auto", mt: 0.5 }} />
          <Divider variant="middle" sx={{ width: 0.1, mx: "auto", mt: 0.5 }} />
          <Divider variant="middle" sx={{ width: 0.05, mx: "auto", my: 0.5 }} />
          <Button startIcon={<FontAwesomeIcon icon={faDiceD20} />}>
            {"Roll 20"}
          </Button>
          <Button startIcon={<FontAwesomeIcon icon={faDragon} />}>
            {"D&D Beyond"}
          </Button>
          <Button startIcon={<Facebook />}>{"Kothis Players Page"}</Button>
        </Stack>
      </Grid>
      <Grid size={8} sx={{ alignContent: "center" }}>
        <Stack direction={"row"} sx={{ height: 1 }}>
          <Typography sx={{ alignSelf: "center", mr: 1 }}>Site Map</Typography>
          <Divider
            variant="middle"
            flexItem
            orientation="vertical"
            sx={{ height: 0.3, my: "auto" }}
          />
          <Divider
            variant="middle"
            flexItem
            orientation="vertical"
            sx={{ height: 0.22, my: "auto", ml: 0.5 }}
          />
          <Divider
            variant="middle"
            flexItem
            orientation="vertical"
            sx={{ height: 0.15, my: "auto", ml: 0.5 }}
          />
          <Divider
            variant="middle"
            flexItem
            orientation="vertical"
            sx={{ height: 0.1, my: "auto", ml: 0.5 }}
          />
          <Divider
            variant="middle"
            flexItem
            orientation="vertical"
            sx={{ height: 0.05, my: "auto", mx: 0.5 }}
          />
        </Stack>
      </Grid>
      <Grid size={12}>
        <Typography align={"center"} fontSize={12}>
          {"Copyright "}
          <Copyright color="primary" fontSize="inherit" />{" "}
          {new Date().getFullYear()}
          <Link href="#" underline="none">
            {" Sylphaxiom "}
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
