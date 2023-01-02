import { useEffect, useState } from "preact/hooks";

type Loading = { tag: "loading" };
type Ok<T> = { tag: "ok"; data: T };
type Error<E> = { tag: "error"; error: E };

const loading: Loading = { tag: "loading" };

export type AsyncState<T, E> =
  | Loading
  | Ok<T>
  | Error<E>;

type OkCb<R, T> = (ok: R) => T;
type ErrCb<E> = (err: any) => E;
type Config<K, R, T, E> = { ok: OkCb<R, T>; err: ErrCb<E>; key: K };

export const useAsync = <K, R, T, E>(
  task: Promise<R>,
  { ok, err, key }: Config<K, R, T, E>,
) => {
  const [state, setState] = useState<AsyncState<T, E>>(loading);

  useEffect(() => {
    setState(loading);
    task
      .then((t) => setState({ tag: "ok", data: ok(t) }))
      .catch((e) => setState({ tag: "error", error: err(e) }));
  }, [key]);

  return state;
};
