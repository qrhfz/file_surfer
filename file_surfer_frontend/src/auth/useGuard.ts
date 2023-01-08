import { route } from "preact-router";
import { useContext, useEffect } from "preact/hooks";
import { TokenContext } from "./tokenSignal";

export const useGuard = () => {
  const tokenSignal = useContext(TokenContext);
  useEffect(() => {
    if (tokenSignal.token === null) {
      route("/login");
    }
  }, [tokenSignal.token]);
};
