import { effect, signal } from "@preact/signals";
import { createContext } from "preact";
import { OpenAPI } from "../generated-sources/openapi";

const tokenSignal = signal(localStorage.getItem("token"));

effect(() => {
  if (tokenSignal.value !== null) {
    OpenAPI.TOKEN = tokenSignal.value;
    localStorage.setItem("token", tokenSignal.value);
  } else {
    localStorage.removeItem("token");
    OpenAPI.TOKEN = "";
  }
});

export const TokenContext = createContext(tokenSignal);
