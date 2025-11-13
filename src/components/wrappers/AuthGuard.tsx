import * as React from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Login from "../utils/Login";
import Loading from "../Loading";
import axios from "axios";

interface Player {
  fname: string;
  lname: string;
  email: string;
  uname: string;
  role: string;
  prefs?: string[];
}

export const ApplyUser = (): Player | void => {
  const { user } = useAuth0();
  const [player, setPlayer] = React.useState<Player>();
  React.useEffect(() => {
    if (user) {
      // Form the API call and await the response
      const username = user.preferred_username ?? "";
      const email = user.email ?? "";

      const API = axios.create({
        baseURL: "https://kothis.sylphaxiom.com/api/v1/",
        headers: {
          Sage: "wVizRhmx0Ufhr8k3xvTQh5kQK2HDqXb3xdbjdawlxXiYiYWcw2YTTWoYMIVjtIH6",
        },
      });

      const params = new URLSearchParams();
      params.append("username", username);
      params.append("email", email);
      API.get("player.php?username=" + username + "&email=" + email)
        .then(function (response) {
          if (response.data.result === "success") {
            const msg: string = response.data.message;
            if (msg.includes("no user matching")) {
              throw "An error occurred: no user found in local DB.";
            } else {
              console.log("setting player as: " + JSON.parse(msg));
              setPlayer(JSON.parse(msg));
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("This shouldn't happen, take a look at stuff");
    }
  }, [player]);
  return player;
};

type PropsAreEqual<P> = (
  prevProps: Readonly<P>,
  nextProps: Readonly<P>
) => boolean;

export const AuthGuard = <P extends {}>(
  component: {
    (props: P): Exclude<React.ReactNode, undefined>;
    displayName?: string;
  },
  propsAreEqual?: PropsAreEqual<P> | false,

  componentName = component.displayName ?? component.name
): {
  (props: P): React.JSX.Element;
  displayName: string;
} => {
  const { getAccessTokenSilently, isLoading, isAuthenticated } = useAuth0();
  function WithAuthHoC(props: P) {
    React.useEffect(() => {
      getAccessTokenSilently({ authorizationParams: { prompt: "none" } })
        .then(() => {})
        .catch((error) => {
          console.log("an error occurred " + error);
          return <Login />;
        });
    }, [isLoading]);

    const Component = withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    });

    if (isAuthenticated) {
      const storage = localStorage.getItem("player");
      if (storage) {
        console.log("Local player present.");
      } else {
        let localPlayer = ApplyUser();
        if (localPlayer) {
          localStorage.setItem("player", JSON.stringify(localPlayer));
        }
      }
    }

    return (<Component {...props} />) as React.JSX.Element;
  }

  // function WithCheckSession(){
  //   const
  // }

  WithAuthHoC.displayName = `WithAuthHoC(${componentName})`;

  let wrappedComponent =
    propsAreEqual === false
      ? WithAuthHoC
      : React.memo(WithAuthHoC, propsAreEqual);

  return wrappedComponent as typeof WithAuthHoC;
};
