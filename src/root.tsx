import { Outlet, Scripts, ScrollRestoration } from "react-router";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Loading from "./components/Loading";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="/sylphaxiom_web_512x.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          as="font"
          crossOrigin="anonymous"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Ballet:opsz@16..72&family=Black+Ops+One&display=swap"
          rel="stylesheet"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Livvic:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,900&display=swap"
          rel="stylesheet"
          as="font"
          crossOrigin="anonymous"
        />
        <link
          href="/App.css"
          rel="stylesheet"
          type="text/css"
          charSet="utf-8"
        />
        <title>Sylphaxiom Creations</title>
      </head>
      <body>
        <InitColorSchemeScript attribute="class" />
        <React.Fragment>
          <ThemeProvider disableTransitionOnChange={false} noSsr theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
            <ScrollRestoration />
          </ThemeProvider>
        </React.Fragment>
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <Loading />;
}

export default function Root() {
  return <Outlet />;
}
