import * as React from "react";
import * as motion from "motion/react-client";
import * as motions from "motion/react";
import { stagger } from "motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { data, useFetcher, useNavigate } from "react-router";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import type { Route } from "./+types/Error.tsx";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import Footer from "./layouts/Footer.tsx";

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
  const url = new URL(request.url);
  const query = decodeURIComponent(url.search);
  const bits = query.slice(1).split("&");
  let params: { [key: string]: string } = {};
  bits.forEach((v) => {
    const pair = v.split("=");
    params[pair[0]] = pair[1];
  });
  return params;
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  // await new Promise((res) => setTimeout(res, 1000));
  let formData = await request.formData();
  const errClient = decodeURI(String(formData.get("errClient")));
  const errConn = decodeURI(String(formData.get("errConn")));
  const errLang = decodeURI(String(formData.get("errLang")));
  const errCode = decodeURI(String(formData.get("errCode")));
  const errDesc = decodeURI(String(formData.get("errDesc")));
  const errTrack = decodeURI(String(formData.get("errTrack")));
  let status: number | null = null;
  let msg: Object | String = "";

  // Form the API call and await the response
  const body = {
    errClient: errClient,
    errConn: errConn,
    errLang: errLang,
    errCode: errCode,
    errDesc: errDesc,
    errTrack: errTrack,
  };

  const API = axios.create({
    baseURL: "https://kothis.sylphaxiom.com/api/v1",
    headers: {
      Sage: "wVizRhmx0Ufhr8k3xvTQh5kQK2HDqXb3xdbjdawlxXiYiYWcw2YTTWoYMIVjtIH6",
      "Content-Type": "application/json",
    },
  });

  await API.put("error.php", body)
    .then(function (response) {
      status = 200;
      msg = response.data.message;
    })
    .catch(function (error) {
      console.log(error);
      status = 400;
      msg = error.message;
    });
  return data({ status, msg });
}

export default function Error({ loaderData }: Route.ComponentProps) {
  const [scope, animate] = motions.useAnimate();
  const [bounce, setBounce] = React.useState(true);
  const [timer, setTimer] = React.useState(10);
  const [ignored, setIgnored] = React.useState(false);
  const [realError, setRealError] = React.useState(false);
  let fetcher = useFetcher();
  let navigate = useNavigate();
  let respMsg = fetcher.data?.msg || "";
  let title = "Oops!";
  let subtitle = "Looks like an error occurred:";
  let errCode: string | undefined;
  let errDesc: string | undefined;
  let errTrack: string | undefined;
  let errClient: string | undefined;
  let errConn: string | undefined;
  let errLang: string | undefined;
  if (loaderData.error) {
    setRealError(true);
    errDesc = loaderData.error_description || undefined;
    errTrack = loaderData.tracking || undefined;
    errClient = loaderData.client_id || undefined;
    errCode = loaderData.error || undefined;
    errConn = loaderData.connection || undefined;
    errLang = loaderData.lang || undefined;
  }

  React.useEffect(() => {
    const bouncy = animate(
      "span",
      { y: [-35, -105, -35] },
      { delay: stagger(0.2) }
    );
    setTimeout(() => {
      bouncy.then;
      setBounce(!bounce);
    }, 3000);
    if (fetcher.state === "idle") {
      if (fetcher.data?.status === 200) {
        respMsg = fetcher.data?.msg;
        console.log(respMsg);
        if (timer === 0) {
          console.log("reset fetcher:");
          fetcher.reset();
          navigate("/");
        }
        setTimeout(() => {
          if (timer !== 0) setTimer(timer - 1);
        }, 1000);
      }
    }
  }, [bounce, timer, fetcher.state]);

  return (
    <Box
      id="error_scr"
      sx={{
        minWidth: 1,
        p: 0,
        textAlign: "center",
      }}
    >
      <img
        src={"/waiting_500x200.svg"}
        id="loading_img"
        className="svg"
        alt="A dude waiting by his computer with his 2 cats"
        width={"50%"}
        height={"auto"}
      />
      <motions.AnimatePresence initial={false} mode="wait">
        <motion.div
          layout
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            overflow: "visible",
            fontFamily: "Courier New, monospace",
            fontSize: "9em",
            fontWeight: 700,
          }}
          ref={scope}
        >
          {title.split("").map((char: string, index: number) => {
            return <motion.span key={char + index}>{char}</motion.span>;
          })}
        </motion.div>
      </motions.AnimatePresence>
      <Typography variant="h2" component="div" sx={{ marginBottom: 10 }}>
        {subtitle} <br />{" "}
        {realError ? errCode : "I don't see one, yet here you are..."}
      </Typography>
      <Grid container sx={{ display: "flex", alignItems: "center" }}>
        <Grid size={4} offset={2}>
          <Typography variant="h5">
            Damn, I hate when that happens. Hopefully it was a fluke, but in
            case it wasn't, here is some more info about whatever it was that
            just happened:
          </Typography>
        </Grid>
        {fetcher.data?.status === 200 ? (
          <Grid size={4} offset={1}>
            {ignored ? (
              <Typography sx={{ fontSize: "1.5em", mb: 2, mt: 5 }}>
                Well, that felt a little hurtful that you'd ignore me like that.
                <br />
                Jokes on you though, I sent the info anyway. Ha!
                <br />
                <div
                  className="tenor-gif-embed"
                  data-postid="8604199"
                  data-share-method="host"
                  data-aspect-ratio="1.02553"
                  data-width="100%"
                >
                  <a href="https://tenor.com/view/joke-missed-over-your-head-gif-8604199">
                    Joke Missed GIF
                  </a>
                </div>{" "}
                <script
                  type="text/javascript"
                  async
                  src="https://tenor.com/embed.js"
                ></script>
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "1.5em", mb: 2, mt: 5 }}>
                Thanks for your cooperation and reporting that pesky error!
                <br />
                {respMsg}
              </Typography>
            )}
            <Typography variant="caption">
              Feel free to click something below, otherwise,
              <br />
              You'll be sent home in <motion.span>{timer}</motion.span>{" "}
              seconds...
            </Typography>
            {timer < 3 ? (
              <Typography variant="caption">
                <br />
                ...Later, homie!
              </Typography>
            ) : null}
          </Grid>
        ) : (
          <>
            <Grid size={2} offset={1}>
              <Stack>
                <Typography variant="h5" sx={{ my: 2 }}>
                  The Details...
                </Typography>
                <Paper variant="outlined" sx={{ padding: 1 }}>
                  <Typography variant="overline">
                    {realError
                      ? errDesc
                      : "I'm honestly at a loss. The buttons don't work because there's nothing to send. Sorry about that, send an email to webmaster@sylphaxiom.com and complain, that might do the trick"}
                  </Typography>
                </Paper>
              </Stack>
            </Grid>
            <Grid size={2} sx={{ px: 2 }}>
              <Stack>
                <Typography variant="h5" sx={{ my: 2 }}>
                  The Options...
                </Typography>
                <fetcher.Form method="post" key="sendErrData">
                  <FormControl>
                    <FormGroup sx={{ display: "none" }}>
                      <TextField
                        id="errCode"
                        name="errCode"
                        value={errCode}
                        type="hidden"
                      />
                      <TextField
                        id="errDesc"
                        name="errDesc"
                        value={errDesc}
                        type="hidden"
                      />
                      <TextField
                        id="errTrack"
                        name="errTrack"
                        value={errTrack}
                        type="hidden"
                      />
                      <TextField
                        id="errConn"
                        name="errConn"
                        value={errConn}
                        type="hidden"
                      />
                      <TextField
                        id="errLang"
                        name="errLang"
                        value={errLang}
                        type="hidden"
                      />
                      <TextField
                        id="errClient"
                        name="errClient"
                        value={errClient}
                        type="hidden"
                      />
                    </FormGroup>
                    <Button
                      type="submit"
                      disabled={!realError}
                      variant="contained"
                      color="primary"
                    >
                      {fetcher.state !== "idle"
                        ? "Sending..."
                        : "Send Error Data"}
                    </Button>
                    <Divider variant="middle" sx={{ m: 2 }} />
                    <Button
                      type="submit"
                      disabled={!realError}
                      variant="contained"
                      onClick={() => setIgnored(true)}
                      color="secondary"
                    >
                      {fetcher.state !== "idle"
                        ? "Ignoring..."
                        : "Ignore Error Data"}
                    </Button>
                  </FormControl>
                </fetcher.Form>
              </Stack>
            </Grid>
          </>
        )}
      </Grid>
      <Footer />
    </Box>
  );
}
