type Func<Args extends Array<any>, Result> = (...args: Args) => Result;

export const memoize = <Args extends Array<any>, Result>(
  fn: Func<Args, Result>,
): Func<Args, Result> => {
  const cache = new Map<Args, Result>();
  return (...args: Args) => {
    if (cache.has(args)) {
      return cache.get(args)!;
    }

    const result = fn(...args);
    cache.set(args, result);
    return result;
  };
};
