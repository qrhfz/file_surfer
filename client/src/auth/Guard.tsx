import { FC } from "preact/compat";
import { useGuard } from "./useGuard";


export function withGuard<P>(Child: FC<P>): FC<P> {
  const X: FC<P> = prop => {
    const { authenticated } = useGuard()

    if (authenticated.value) {
      return Child(prop)
    }

    return <>Unauthorized</>
  }

  return X
}