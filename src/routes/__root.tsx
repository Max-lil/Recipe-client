import {
  createRootRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import {
  Box,
  Burger,
  Container,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { siteConfig } from "../assets/siteAssets";
import logo from "../assets/ChatGPT Image 28 jan. 2026 15_35_24.svg";

export const Route = createRootRoute({
  component: RootLayout,
});

const navLinks = [
  { label: "Hem", to: "/" },
  { label: "Veckoplanering", to: "/weeklyplanning" },
  { label: "Inköpslista", to: "/shoppinglist" },
  { label: "Recept", to: "/recipes" },
];

function RootLayout() {
  const theme = useMantineTheme();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <Box
      style={{
        minHeight: "100vh",
        backgroundColor: theme.other.surface,
      }}
    >
      <Box
        component="header"
        style={{
          backgroundColor: theme.other.surfaceHigh,
          borderBottom: `1px solid ${theme.other.outlineVariant}`,
        }}
      >
        <Container size="lg">
          <Group justify="space-between" h={70}>
            <Box
              component="img"
              src={logo}
              alt={siteConfig.logoAlt}
              style={{
                width: 72,
                height: 26,
                display: "block",
                objectFit: "contain",
              }}
            />

            <Text size="lg" c={theme.colors.primary[6]}>
              {siteConfig.siteName}
            </Text>

            <Group gap={0} visibleFrom="sm">
              {navLinks.map((link) => {
                const isActive = pathname === link.to;

                return (
                  <UnstyledButton
                    key={link.to}
                    component={Link}
                    to={link.to}
                    style={{
                      height: 70,
                      paddingInline: 18,
                      display: "flex",
                      alignItems: "center",
                      color: isActive
                        ? theme.colors.primary[6]
                        : theme.other.textSecondary,
                      fontWeight: isActive ? 600 : 500,
                      borderBottom: isActive
                        ? `2px solid ${theme.colors.primary[6]}`
                        : "2px solid transparent",
                    }}
                  >
                    {link.label}
                  </UnstyledButton>
                );
              })}
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
              aria-label="Öppna navigation"
              color={theme.colors.primary[6]}
              lineSize={3}
            />
          </Group>
        </Container>
      </Box>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title={siteConfig.siteName}
        hiddenFrom="sm"
        zIndex={1000000}
        styles={{
          content: {
            backgroundColor: theme.other.surfaceLowest,
          },
          header: {
            backgroundColor: theme.other.surfaceLowest,
            borderBottom: `1px solid ${theme.other.outlineVariant}`,
          },
          body: {
            backgroundColor: theme.other.surfaceLowest,
          },
        }}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider
            style={{
              borderColor: theme.other.outlineVariant,
            }}
          />

          <Box px="md" py="sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.to;

              return (
                <UnstyledButton
                  key={link.to}
                  component={Link}
                  to={link.to}
                  onClick={closeDrawer}
                  style={{
                    width: "100%",
                    padding: "12px 4px",
                    display: "block",
                    color: isActive
                      ? theme.colors.primary[6]
                      : theme.other.textPrimary,
                    fontWeight: isActive ? 600 : 500,
                    borderBottom: `1px solid ${theme.other.surfaceHigh}`,
                  }}
                >
                  {link.label}
                </UnstyledButton>
              );
            })}
          </Box>
        </ScrollArea>
      </Drawer>

      <Container size="lg" py="xl">
        <Outlet />
      </Container>
    </Box>
  );
}
