import { json, redirect, type LoaderFunctionArgs } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { dependenciesLocator } from "@/core/common/dependencies";
import { Navbar } from "@/components";
import { requireUserSession } from "@/routes/utils/session.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await requireUserSession(args);

  const { storeId } = args.params;
  const service = dependenciesLocator.storeService();
  const { store, error } = await service.getStore(userId, storeId as string);

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
