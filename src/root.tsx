import { cssBundleHref } from "@remix-run/css-bundle";
import {
  redirect,
  type LinksFunction,
  type LoaderFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { rootAuthLoader } from "@clerk/remix/ssr.server";
import { ClerkApp, V2_ClerkErrorBoundary } from "@clerk/remix";
import { ModalProvider } from "~/providers/modal-provider";
import { ToastProvider } from "~/providers/toast-provider";
import { StoreService } from "~/services/store-service";
import styles from "~/tailwind.css";
import type { ActionFunction } from "react-router-dom";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export const loader: LoaderFunction = async (args) => {
  return rootAuthLoader(args, async ({ request }) => {
    const storeService = new StoreService();
    const { userId } = request.auth;
    if (!userId) {
      return redirect("/sign-in", 302);
    }

    const store = await storeService.getStoreByUserId(userId);
    if (!store) {
      return redirect(`/${store}`, 302);
    }

    return { store };
  });
};

export const action: ActionFunction = async ({ request }) => {
  const storeService = new StoreService();
  const formData = await request.formData();
  const userId = formData.get("userId") as string;
  const name = formData.get("name") as string;
  return await storeService.addNewStore(userId, name);
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
