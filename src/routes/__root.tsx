import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { AppShell, Burger, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { siteConfig } from "../assets/siteAssets";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const [opened, { toggle, close }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header className="flex items-center" bg={"green"}>
        <div className="">
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="md" />
        </div>

        <div className="flex">
          <img
            src={siteConfig.logoUrl}
            alt={siteConfig.logoAlt}
            style={{ height: 50, width: "auto", display: "block" }}
          />
          <div className="">
            {" "}
            <Text size="md" fw={700} className="ml-2">
              {siteConfig.siteName}
            </Text>
          </div>
        </div>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <div className="flex flex-col gap-2">
          <Link to="/" onClick={close}>
            Home
          </Link>
          <Link to="/weeklyplanning" onClick={close}>
            Weekly planning
          </Link>
          <Link to="/shoppinglist" onClick={close}>
            Shopping list
          </Link>
          <Link to="/recipes" onClick={close}>
            Recipes
          </Link>
        </div>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
