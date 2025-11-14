import * as React from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Login from "../utils/Login";
import Loading from "../Loading";
import axios from "axios";
import { useLocation } from "react-router";

interface Player {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
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
            const msg: Player = response.data.message;
            if (!msg) {
              throw "An error occurred: no user found in local DB.";
            } else {
              const stored_player = localStorage.getItem("player");
              if (stored_player === JSON.stringify(msg)) {
                console.log("Same, skipping.");
              } else {
                setPlayer(msg);
              }
            }
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      console.log("This shouldn't happen, take a look at stuff");
    }
  }, []);
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
  const { getAccessTokenSilently, isAuthenticated, getIdTokenClaims, logout } =
    useAuth0();
  const location = useLocation();
  function WithAuthHoC(props: P) {
    const Component = withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    });
    React.useEffect(() => {
      getAccessTokenSilently({ authorizationParams: { prompt: "none" } })
        .then(() => {
          getIdTokenClaims()
            .then((claims) => {
              if (claims?.iss !== "https://auth.kothis.sylphaxiom.com/") {
                logout({ logoutParams: { returnTo: location.pathname } });
              }
              const time = Date.now();
              if (claims?.exp && claims.exp < time) {
                logout({ logoutParams: { returnTo: location.pathname } });
              }
            })
            .catch();
        })
        .catch((error) => {
          console.log("an error occurred " + error);
          return <Login />;
        });
    }, []);

    if (!isAuthenticated) {
      const storage = localStorage.getItem("player");
      if (storage) {
        localStorage.clear();
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
