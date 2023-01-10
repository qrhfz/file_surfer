import { useEffect, useState } from "preact/hooks";

type Loading = { status: "loading" };
type Ok<T> = { status: "ok"; data: T };
type Error<E> = { status: "error"; error: E };

const loading: Loading = { status: "loading" };

export type AsyncState<T, E> =
  | Loading
  | Ok<T>
  | Error<E>;

type OkCb<R, T> = (_ok: R) => T;
type ErrCb<E> = (_err: any) => E;
type Config<K, R, T, E> = { ok: OkCb<R, T>; err: ErrCb<E>; key: K };

export const useAsync = <K, R, T, E>(
  task: Promise<R>,
  { ok, err, key }: Config<K, R, T, E>,
) => {
  const [state, setState] = useState<AsyncState<T, E>>(loading);

  useEffect(() => {
    setState(loading);
    task
      .then(async (t) => {
        const data = await ok(t);
        setState({ status: "ok", data });
      })
      .catch((e) => setState({ status: "error", error: err(e) }));
  }, [key]);

  return state;
};
