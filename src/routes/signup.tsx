import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import {
  Alert,
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useSignUpMutation } from "../services/auth/queries";
import { authClient } from "../utils/auth-client";

export const Route = createFileRoute("/signup")({
  beforeLoad: async () => {
    const { data: session } = await authClient.getSession();

    if (session) {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const signUpMutation = useSignUpMutation();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedUsername = username.trim();
    const trimmedEmail = email.trim();

    setErrorMessage(null);

    if (!trimmedName) {
      setErrorMessage("Fyll i ditt namn.");
      return;
    }

    if (!trimmedUsername) {
      setErrorMessage("Fyll i ett användarnamn.");
      return;
    }

    if (!trimmedEmail) {
      setErrorMessage("Fyll i din e-postadress.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Lösenordet måste vara minst 8 tecken.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Lösenorden matchar inte.");
      return;
    }

    signUpMutation.mutate(
      { name: trimmedName, email: trimmedEmail, username: trimmedUsername, password },
      {
        onSuccess: () => {
          navigate({ to: "/" });
        },
        onError: (error) => {
          setErrorMessage(error.message || "Kunde inte skapa kontot.");
        },
      },
    );
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Skapa konto</Title>

      <Text ta="center" mt="sm">
        Har du redan ett konto?{" "}
        <Anchor component={Link} to="/login">
          Logga in
        </Anchor>
      </Text>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <Stack gap="md">
            <TextInput
              label="Namn"
              placeholder="Ditt namn"
              required
              radius="md"
              value={name}
              onChange={(event) => setName(event.currentTarget.value)}
            />

            <TextInput
              label="Användarnamn"
              placeholder="dittanvandarnamn"
              required
              radius="md"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />

            <TextInput
              label="E-post"
              placeholder="du@example.com"
              required
              radius="md"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            />

            <PasswordInput
              label="Lösenord"
              placeholder="Ditt lösenord"
              required
              radius="md"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
            />

            <PasswordInput
              label="Bekräfta lösenord"
              placeholder="Upprepa lösenordet"
              required
              radius="md"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.currentTarget.value)}
            />

            {errorMessage ? <Alert color="danger">{errorMessage}</Alert> : null}

            <Button
              type="submit"
              fullWidth
              mt="md"
              radius="md"
              loading={signUpMutation.isPending}
            >
              Skapa konto
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
