import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";

import { dependenciesLocator } from "@/core/common/dependencies";
import { requireUserSession } from "@/routes/utils/session.server";

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await requireUserSession(args);

  const service = dependenciesLocator.storeService();
  const { stores, error } = await service.getAllStoresByUser(userId);

  if (error) {
    throw json({ error: error.kind }, { status: 500 });
  }

  return json({ stores });
};

export const action = async (args: ActionFunctionArgs) => {
  const { userId } = await requireUserSession(args);

  const service = dependenciesLocator.storeService();
  const formData = await args.request.formData();

  const name = formData.get("name") as string;
  const { store, error } = await service.saveStore(userId, name);

  if (error) {
    throw json({ error: error.kind }, { status: 500 });
  }

  return redirect(`/${store?.id}`);
};
