import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import type { LoaderFunction } from "@remix-run/node";

import { getAuth } from "@clerk/remix/ssr.server";

import { dependenciesLocator } from "@/core/common/dependencies";

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    throw redirect("/sign-in", 302);
  }

  const { storeId } = args.params;
  const ploc = dependenciesLocator.storePloc();
  await ploc.getStore(userId, storeId as string);

  const { store, error } = ploc.currentState;

  if (error) {
    throw json({ error: error.kind }, { status: 500 });
  }

  if (!store) {
    return redirect("/", 302);
  }

  return json(store);
};

export default function DashboardLayout() {
  return (
    <>
      <nav>This will be a navbar</nav>
      <Outlet />
    </>
  );
}
