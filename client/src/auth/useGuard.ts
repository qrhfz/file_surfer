import { route } from "preact-router";
import { useContext, useEffect } from "preact/hooks";
import { ApiError, UserService } from "../generated-sources/openapi";
import { TokenContext } from "./tokenSignal";

export const useGuard = () => {
  const tokenSignal = useContext(TokenContext);
  useEffect(() => {
    if (tokenSignal.value === null) {
      route("/login");
    }
  }, [tokenSignal.value]);

  useEffect(() => {
    UserService.getUserMe().catch((e: ApiError) => {
      if (e.status === 401) {
        tokenSignal.value = null;
      }
    });
  }, []);

  return {
    authenticated: tokenSignal.value !== null,
  };
};
