import { UserButton } from "@clerk/remix";

import { MainNav, StoreSwitcher } from "@/components";

export function Navbar() {
  return (
    <section className="border-b">
      <aside className="flex h-16 items-center px-4">
        <StoreSwitcher />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </aside>
    </section>
  );
}
