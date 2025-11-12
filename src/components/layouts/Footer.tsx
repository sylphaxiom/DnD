import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Copyright from "@mui/icons-material/Copyright";
import Facebook from "@mui/icons-material/Facebook";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDragon, faDiceD20 } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <Container
      id="footRoot"
      sx={{
        minWidth: "100vw",
        paddingTop: 1,
      }}
    >
      <Stack direction={"column"}>
        <Stack
          direction={"row"}
          spacing={2}
          sx={{
            justifyContent: "space-evenly",
            alignItems: "flex-start",
          }}
        >
          <Button startIcon={<Facebook />}>{"Kothis Players Page"}</Button>
          <Button startIcon={<FontAwesomeIcon icon={faDragon} />}>
            {"D&D Beyond"}
          </Button>
          <Button startIcon={<FontAwesomeIcon icon={faDiceD20} />}>
            {"Roll 20"}
          </Button>
        </Stack>
        <Typography align={"center"} fontSize={12}>
          {"Copyright "}
          <Copyright color="primary" fontSize="inherit" />{" "}
          {new Date().getFullYear()}
          <Link href="#" underline="none">
            {" Sylphaxiom "}
          </Link>
        </Typography>
      </Stack>
    </Container>
  );
}
