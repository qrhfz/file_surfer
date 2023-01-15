import { FunctionComponent } from "preact"

type ButtonProp = {
  onClick?: () => void,
  type?: string
}

export const PrimaryButton: FunctionComponent<ButtonProp> = ({ children, onClick, type }) => {
  return (
    <button
      class="btn btn-primary"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export const SmallPrimaryButton: FunctionComponent<ButtonProp> = ({ children, onClick, type }) => {
  return (
    <button
      class="btn btn-primary btn-sm"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export const SmallSecondaryButton: FunctionComponent<ButtonProp> = ({ children, onClick, type }) => {
  return (
    <button
      class="btn btn-secondary btn-sm"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export const SecondaryButton: FunctionComponent<ButtonProp> = ({ children, onClick, type }) => {
  return (
    <button
      class="btn btn-secondary"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}



