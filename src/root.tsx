import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { ClerkApp, V2_ClerkErrorBoundary } from "@clerk/remix";
import { rootAuthLoader } from "@clerk/remix/ssr.server";

import { ModalProvider, ToastProvider } from "@/components/providers";

import styles from "@/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader = (args: LoaderArgs) => rootAuthLoader(args);

export const ErrorBoundary = V2_ClerkErrorBoundary();

function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ToastProvider />
        <ModalProvider />
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default ClerkApp(App);
