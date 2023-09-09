import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";

import { dependenciesLocator } from "@/core/common/dependencies";
import { requireUserSession } from "@/routes/utils/session.server";
import type {
  CommonStoreState,
  ManyStoresState,
  SingleStoreState,
} from "@/core/store/presentation";

export const loader = async (args: LoaderArgs) => {
  console.log("args", args);
  const { userId } = await requireUserSession(args);

  const ploc = dependenciesLocator.storePloc();
  await ploc.getAllStoresByUser(userId);

  const { stores, error } = ploc.currentState as CommonStoreState &
    ManyStoresState;

  console.log("stores from database", stores, error);
  if (error) {
    throw json({ error: error.kind }, { status: 500 });
  }

  return json({ stores });
};

export const action = async (args: ActionArgs) => {
  const { userId } = await requireUserSession(args);

  const ploc = dependenciesLocator.storePloc();
  const formData = await args.request.formData();

  const name = formData.get("name") as string;
  await ploc.saveStore(userId, name);

  const { store, error } = ploc.currentState as CommonStoreState &
    SingleStoreState;

  if (error) {
    throw json({ error: error.kind }, { status: 500 });
  }

  return redirect(`/${store?.id}`);
};
