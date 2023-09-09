import { json, redirect, type LoaderArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { dependenciesLocator } from "@/core/common/dependencies";
import { Navbar } from "@/components";
import { requireUserSession } from "@/routes/utils/session.server";
import type {
  CommonStoreState,
  SingleStoreState,
} from "@/core/store/presentation";

export const loader = async (args: LoaderArgs) => {
  const { userId } = await requireUserSession(args);

  const { storeId } = args.params;
  const ploc = dependenciesLocator.storePloc();
  await ploc.getStore(userId, storeId as string);

  const { store, error } = ploc.currentState as SingleStoreState &
    CommonStoreState;

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
      <Navbar />
      <Outlet />
    </>
  );
}
