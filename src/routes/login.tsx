import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Alert,
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  SegmentedControl,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useSignInMutation, useSignInWithUsernameMutation } from "../services/auth/queries";
import { authClient } from "../utils/auth-client";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (session) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [mode, setMode] = useState<"email" | "username">("email");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const signInMutation = useSignInMutation();
  const signInWithUsernameMutation = useSignInWithUsernameMutation();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage(null);

    if (mode === "username") {
      const trimmedUsername = username.trim();

      if (!trimmedUsername || !password) {
        setErrorMessage("Fyll i användarnamn och lösenord.");
        return;
      }

      signInWithUsernameMutation.mutate(
        { username: trimmedUsername, password },
        {
          onSuccess: () => {
            navigate({ to: "/" });
          },
          onError: (error) => {
            setErrorMessage(error.message || "Fel användarnamn eller lösenord.");
          },
        },
      );
      return;
    }

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setErrorMessage("Fyll i e-post och lösenord.");
      return;
    }

    signInMutation.mutate(
      { email: trimmedEmail, password },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: (error) => {
          setErrorMessage(error.message || "Fel e-post eller lösenord.");
        },
      },
    );
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Välkommen tillbaka!</Title>

      <Text ta="center" mt="sm">
        Har du inget konto än?{" "}
        <Anchor component={Link} to="/signup">
          Skapa konto
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <SegmentedControl
            fullWidth
            value={mode}
            onChange={(value) => setMode(value as "email" | "username")}
            data={[
              { label: "E-post", value: "email" },
              { label: "Användarnamn", value: "username" },
            ]}
          />
          {mode === "username" ? (
            <TextInput
              label="Användarnamn"
              placeholder="dittanvandarnamn"
              required
              radius="md"
              mt="md"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          ) : (
            <TextInput
              label="E-post"
              placeholder="du@example.com"
              required
              radius="md"
              mt="md"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          )}
          <PasswordInput
            label="Lösenord"
            placeholder="Ditt lösenord"
            required
            mt="md"
            radius="md"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />

          {errorMessage ? (
            <Alert color="danger" mt="md">
              {errorMessage}
            </Alert>
          ) : null}

          <Group justify="space-between" mt="lg">
            <Checkbox label="Kom ihåg mig" />
          </Group>
          <Button
            type="submit"
            fullWidth
            mt="xl"
            radius="md"
            loading={signInMutation.isPending || signInWithUsernameMutation.isPending}
          >
            Logga in
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
