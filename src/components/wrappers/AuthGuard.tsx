import * as React from "react";
import { withAuthenticationRequired, useAuth0 } from "@auth0/auth0-react";
import Login from "../utils/Login";
import Loading from "../Loading";

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
  const { user, getAccessTokenSilently } = useAuth0();
  console.log("AuthGuard called");
  function WithAuthHoC(props: P) {
    React.useEffect(() => {
      console.log("getting token");
      getAccessTokenSilently({ authorizationParams: { prompt: "none" } })
        .then(() => {
          console.log("user found " + user?.name);
        })
        .catch((error) => {
          console.log("an error occurred " + error);
          return <Login />;
        });
    }, [getAccessTokenSilently]);
    const Component = withAuthenticationRequired(component, {
      onRedirecting: () => <Loading />,
    });
    console.log("returning from WithAuthHoC");

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
