import { useEffect, useState } from "preact/hooks";

type Loading = { tag: "loading" };
type Ok<T> = { tag: "ok"; data: T };
type Error = { tag: "error"; error: any };

const loading: Loading = { tag: "loading" };

export type AsyncState<T> =
  | Loading
  | Ok<T>
  | Error;

const useAsync = <T>(task: Promise<T>) => {
  const [state, setState] = useState<AsyncState<T>>(loading);

  useEffect(() => {
    task
      .then((t) => setState({ tag: "ok", data: t }))
      .catch((e) => setState({ tag: "error", error: e }));
  }, []);

  return state;
};
