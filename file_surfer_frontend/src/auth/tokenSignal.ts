import { signal } from "@preact/signals";
import { createContext } from "preact";
import { OpenAPI } from "../generated-sources/openapi";

export const createTokenSignal = () => {
  const token = localStorage.getItem("token");
  const tokenSignal = signal(token);
  if (token) {
    OpenAPI.TOKEN = token;
  }

  return {
    token: tokenSignal.value,
    setToken: (token: string): void => {
      OpenAPI.TOKEN = token;
      localStorage.setItem("token", token);
      tokenSignal.value = token;
    },
  };
};

export const TokenContext = createContext(createTokenSignal());
