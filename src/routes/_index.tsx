import { UserButton } from "@clerk/remix";
import { getAuth } from "@clerk/remix/ssr.server";
import { redirect } from "@remix-run/node";

import type { LoaderFunction, V2_MetaFunction } from "@remix-run/node";
import { Modal } from "~/components/ui/modal";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async (args) => {
  const { userId } = await getAuth(args);
  if (!userId) {
    return redirect("/sign-in");
  }
  return {};
};

export default function Index() {
  return (
    <div className="p-4">
      <Modal
        title="Test"
        description="Description Test"
        isOpen={true}
        onClose={() => {}}
      >
        Children
      </Modal>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
