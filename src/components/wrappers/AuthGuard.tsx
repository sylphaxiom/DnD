import * as React from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Login from "../utils/Login";
import Loading from "../Loading";
import { useLocation } from "react-router";

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
              if (isAuthenticated) {
                if (claims?.iss !== "https://auth.kothis.sylphaxiom.com/") {
                  console.log("fail iss, logout");
                  logout({ logoutParams: { returnTo: location.pathname } });
                }
                const time = Date.now();
                if (claims?.exp && claims.exp > time) {
                  console.log("fail exp, logout");
                  logout({ logoutParams: { returnTo: location.pathname } });
                }
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
