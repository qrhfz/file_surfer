import { FunctionComponent } from "preact"

type ButtonProp = {
  onClick: () => void
}

export const PrimaryButton: FunctionComponent<ButtonProp> = ({ children, onClick }) => {
  return (
    <button
      class="btn btn-primary"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const SmallPrimaryButton: FunctionComponent<ButtonProp> = ({ children, onClick }) => {
  return (
    <button
      class="btn btn-primary btn-sm"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export const SecondaryButton: FunctionComponent<ButtonProp> = ({ children, onClick }) => {
  return (
    <button
      class="btn btn-secondary"
      onClick={onClick}
    >
      {children}
    </button>
  )
}



