import { authClient } from "../../utils/auth-client";

interface SignUpInput {
  name: string;
  email: string;
  username: string;
  password: string;
}

interface SignInInput {
  email: string;
  password: string;
}

interface SignInUsernameInput {
  username: string;
  password: string;
}

export const signUp = async (input: SignUpInput) => {
  const { data, error } = await authClient.signUp.email(input);
  if (error) {
    // better-auth's error.message comes back in English, so we show our own
    // Swedish message here instead of surfacing it directly.
    if (error.code === "USERNAME_IS_ALREADY_TAKEN") {
      throw new Error("Användarnamnet är upptaget. Välj ett annat.");
    }
    if (error.code === "USERNAME_TOO_SHORT") {
      throw new Error("Användarnamnet är för kort.");
    }
    if (error.code === "USERNAME_TOO_LONG") {
      throw new Error("Användarnamnet är för långt.");
    }
    if (error.code === "INVALID_USERNAME") {
      throw new Error("Användarnamnet innehåller ogiltiga tecken.");
    }
    throw new Error("Kunde inte skapa kontot. Kontrollera uppgifterna och försök igen.");
  }
  return data;
};

export const signIn = async (input: SignInInput) => {
  const { data, error } = await authClient.signIn.email(input);
  if (error) {
    throw new Error("Fel e-post eller lösenord.");
  }
  return data;
};

export const signInWithUsername = async (input: SignInUsernameInput) => {
  const { data, error } = await authClient.signIn.username(input);
  if (error) {
    if (error.code === "INVALID_USERNAME_OR_PASSWORD") {
      throw new Error("Fel användarnamn eller lösenord.");
    }
    throw new Error("Kunde inte logga in.");
  }
  return data;
};

export const signOut = async () => {
  const { error } = await authClient.signOut();
  if (error) {
    throw new Error("Kunde inte logga ut.");
  }
};
