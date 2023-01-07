import { Context } from "preact"

export function registerProvider<T>(context: Context<T>, value: T): ContextItem<T> {
  return {
    Context: context,
    value: value
  }
}

interface ContextItem<T> {
  Context: Context<T>
  value: T
}

type MultiProviderProp = {
  items: ContextItem<any>[]
}

type MultiProvider = preact.FunctionalComponent<MultiProviderProp>

export const MultiProvider: MultiProvider = ({ children, items: contexts }) => {
  if (contexts.length === 0) {
    return <>{children}</>
  }

  const { Context, value } = contexts.shift()!

  return (
    <>
      {contexts.reduce((_, next) => {
        const { Context, value } = next
        return (
          <Context.Provider value={value}>{children}</Context.Provider>
        )
      }, <Context.Provider value={value}>{children}</Context.Provider>)}
    </>
  )
}