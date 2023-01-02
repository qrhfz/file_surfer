import { FunctionComponent } from "preact"

type ButtonProp = {
  onClick: () => void
}

export const PrimaryButton: FunctionComponent<ButtonProp> = ({ children, onClick }) => {
  return (
    <button
      class="inline-block rounded-xl border border-indigo-600 bg-indigo-600 px-8 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const SecondaryButton: FunctionComponent<ButtonProp> = ({ children, onClick }) => {
  return (
    <button
      class="inline-block rounded-xl border border-indigo-600 px-8 py-3 text-sm font-medium text-indigo-600 hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring active:bg-indigo-500"
      onClick={onClick}
    >
      {children}
    </button>
  )
}



