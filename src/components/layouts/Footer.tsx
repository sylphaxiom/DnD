import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Copyright from "@mui/icons-material/Copyright";
import Facebook from "@mui/icons-material/Facebook";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon, faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router";

export default function Footer() {
  return (
    <Grid
      container
      id="footRoot"
      sx={{
        // maxWidth: "75vw",

        paddingTop: "100px",
        mx: 3,
      }}
    >
      <Grid
        size={12}
        container
        sx={{ display: "flex", justifyContent: "space-around" }}
      >
        <Grid>
          <NavLink to="/login" style={{ marginRight: "1em" }}>
            Sign-In
          </NavLink>
        </Grid>
        <Grid>
          <NavLink to="/" style={{ marginRight: "1em" }}>
            Home
          </NavLink>
        </Grid>
        <Grid>
          <NavLink to="/lore/portal" style={{ marginRight: "1em" }}>
            About
          </NavLink>
        </Grid>
        <Grid>
          <NavLink to="/lore/creators" style={{ marginRight: "1em" }}>
            Contributors
          </NavLink>
        </Grid>
        <Grid>
          <NavLink
            to="https://sylphaxiom.com/contact"
            style={{ marginRight: "1em" }}
          >
            Contact
          </NavLink>
        </Grid>
      </Grid>
      <Grid size={12} sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button startIcon={<FontAwesomeIcon icon={faDiceD20} />}>
          {"Roll 20"}
        </Button>
        <Divider
          variant="middle"
          flexItem
          orientation="vertical"
          sx={{ height: 0.5 }}
        />
        <Button startIcon={<FontAwesomeIcon icon={faDragon} />}>
          {"D&D Beyond"}
        </Button>
        <Divider
          variant="middle"
          flexItem
          orientation="vertical"
          sx={{ height: 0.5 }}
        />
        <Button startIcon={<Facebook />}>
          <span style={{}}> {"Kothis Players Page"}</span>
        </Button>
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
