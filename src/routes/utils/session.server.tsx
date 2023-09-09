import { getAuth } from "@clerk/remix/ssr.server";
import { redirect, type DataFunctionArgs } from "@remix-run/node";

export async function requireUserSession(args: DataFunctionArgs) {
  const auth = await getAuth(args);

  if (!auth.userId) {
    throw redirect("/sign-in", 302);
  }

  return auth;
}
