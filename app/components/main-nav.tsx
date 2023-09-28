import { NavLink, useParams } from "@remix-run/react";

import { cn } from "@/core/lib/utils";

export function MainNav(props: React.HTMLAttributes<HTMLElement>) {
  const params = useParams();
  const routes = [
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
    },
  ];

  return (
    <nav
      className={cn(
        "flex items-center space-x-4 lg:space-x-6",
        props.className
      )}
    >
      {routes.map((route) => (
        <NavLink
          key={route.href}
          to={route.href}
          className={({ isActive }) =>
            cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive ? "text-black dark:text-white" : "text-muted-foreground"
            )
          }
        >
          {route.label}
        </NavLink>
      ))}
    </nav>
  );
}
