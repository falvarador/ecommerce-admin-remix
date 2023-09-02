import { Outlet } from "@remix-run/react";

export default function AuthLayout() {
  return (
    <section className="flex items-center justify-center h-screen">
      <Outlet />
    </section>
  );
}
