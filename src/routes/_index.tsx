import { getAuth } from "@clerk/remix/ssr.server";
import { useEffect } from "react";
import { UserButton } from "@clerk/remix";

import {
  redirect,
  type LoaderFunction,
  type V2_MetaFunction,
  json,
} from "@remix-run/node";

import { dependenciesLocator } from "@/core/common/dependencies";
import { useStoreModal } from "@/hooks";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "eCommerce dashboard" },
  ];
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);

  if (!userId) {
    throw redirect("/sign-in", 302);
  }

  const ploc = dependenciesLocator.storePloc();
  await ploc.getStoreByUser(userId);

  const { store, error } = ploc.currentState;

  if (error) {
    throw json({ error: error.kind }, { status: 500 });
  }

  if (store) {
    return redirect(`/${store.id}`);
  }

  return json({ store });
};

export default function Index() {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <UserButton afterSignOutUrl="/" />;
}
