type Loading = { status: "loading" };
type Ok<T> = { status: "ok"; data: T };
type Error<E> = { status: "error"; error: E };

export type AsyncState<T, E> =
  | Loading
  | Ok<T>
  | Error<E>;
