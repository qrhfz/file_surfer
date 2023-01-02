import { signal } from "@preact/signals";
import { createContext } from "preact";
import { OpenAPI } from "../generated-sources/openapi";

export const createTokenSignal = () => {
  const token = localStorage.getItem("token");
  const tokenSignal = signal(token);

  tokenSignal.subscribe((token) => {
    if (token) {
      OpenAPI.TOKEN = token;
      localStorage.setItem("token", token);
    }
  });

  return {
    token: tokenSignal.value,
    setToken: (token: string): void => {
      tokenSignal.value = token;
    },
  };
};

export const TokenContext = createContext(createTokenSignal());
