import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

import { dependenciesLocator } from "@/core/common/dependencies";

export const loader: LoaderFunction = async (args) => {
  const { storeId } = args.params;
  const ploc = dependenciesLocator.storePloc();
  await ploc.getStore(storeId as string, args);

  const { store, error } = ploc.currentState;

  if (error?.kind === "AnonymousUserError") {
    throw redirect("/sign-in", 302);
  }

  if (!store) {
    return redirect("/", 302);
  }

  return json(store);
};

export default function DashboardLayout() {
  // const data = useLoaderData<typeof loader>();

  return (
    <>
      <nav>This will be a navbar</nav>
      {/* <p>{JSON.stringify(data)}</p> */}
      <Outlet />
    </>
  );
}
