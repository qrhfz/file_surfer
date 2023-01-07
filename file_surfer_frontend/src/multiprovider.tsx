import { Context } from "preact"

export function createContextItem<T>(context: Context<T>, value: T): ContextItem<T> {
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
  contexts: ContextItem<any>[]
}
type MultiProvider = preact.FunctionalComponent<MultiProviderProp>
export const MultiProvider: MultiProvider = ({ children, contexts }) => {
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