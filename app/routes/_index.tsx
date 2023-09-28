import { useEffect } from "react";
import {
  json,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";

import { dependenciesLocator } from "@/core/common/dependencies";
import { requireUserSession } from "@/routes/utils/session.server";
import { useStoreModal } from "@/hooks";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
    { name: "description", content: "eCommerce dashboard" },
  ];
};

export const loader = async (args: LoaderFunctionArgs) => {
  const { userId } = await requireUserSession(args);

  const service = dependenciesLocator.storeService();
  const { store, error } = await service.getStoreByUser(userId);

  if (error) {
    throw json({ error: error.kind }, { status: 500 });
  }

  if (store) {
    return redirect(`/${store.id}`);
  }

  return {};
};

export default function Index() {
  const { isOpen, onOpen } = useStoreModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
}
