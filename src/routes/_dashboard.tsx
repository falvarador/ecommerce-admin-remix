import { getAuth } from "@clerk/remix/ssr.server";
import type { LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

import { StoreService } from "~/services/store-service";

export const loader: LoaderFunction = async (args) => {
  const storeService = new StoreService();
  const { storeId } = args.params;

  const { userId } = await getAuth(args);

  if (!userId) {
    redirect("/sign-in", 302);
  }

  const response = await storeService.getStore(userId!, storeId!);

  if (response.status === 404) {
    redirect("/", 302);
  }

  return json(response);
};

export default function DashboardLayout() {
  //   const data = useLoaderData<typeof loader>();

  return (
    <>
      <nav>This will be a navbar</nav>
      <Outlet />
    </>
  );
}
