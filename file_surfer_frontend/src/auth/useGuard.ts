import { route } from "preact-router";
import { useEffect } from "preact/hooks";

export const useGuard = () => {
  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      route("/login");
    }
  }, []);
};
