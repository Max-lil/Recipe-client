import { useMutation } from "@tanstack/react-query";
import { signIn, signInWithUsername, signOut, signUp } from "./api";

export const useSignUpMutation = () => {
  return useMutation({ mutationFn: signUp });
};

export const useSignInMutation = () => {
  return useMutation({ mutationFn: signIn });
};

export const useSignInWithUsernameMutation = () => {
  return useMutation({ mutationFn: signInWithUsername });
};

export const useSignOutMutation = () => {
  return useMutation({ mutationFn: signOut });
};
