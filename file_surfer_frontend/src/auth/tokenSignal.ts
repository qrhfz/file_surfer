import { signal } from "@preact/signals";
import { createContext } from "preact";

export const createTokenSignal = () => {
  const token = localStorage.getItem("token");
  const tokenSignal = signal(token);

  return {
    token: tokenSignal.value,
    setToken: (token: string): void => {
      localStorage.setItem("token", token);
      tokenSignal.value = token;
    },
  };
};

export const TokenContext = createContext(createTokenSignal());
