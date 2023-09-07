import { cssBundleHref } from "@remix-run/css-bundle";
import { json, redirect } from "@remix-run/node";
import type {
  ActionFunction,
  LinksFunction,
  LoaderFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { ClerkApp, V2_ClerkErrorBoundary } from "@clerk/remix";
import { getAuth, rootAuthLoader } from "@clerk/remix/ssr.server";

import { dependenciesLocator } from "@/core/common/dependencies";
import { ModalProvider, ToastProvider } from "@/components/providers";

import styles from "@/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = (args) => rootAuthLoader(args);

export const action: ActionFunction = async (args) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    throw redirect("/sign-in", 302);
  }

  const ploc = dependenciesLocator.storePloc();
  const formData = await args.request.formData();

  const name = formData.get("name") as string;
  await ploc.saveStore(userId, name);

  const { store, error } = ploc.currentState;

  if (error) {
    throw json({ error: error.kind }, { status: 500 });
  }

  return redirect(`/${store?.id}`);
};

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
