import { FC } from "preact/compat"

type ButtonProp = {
  onClick?: () => void,
  type?: string,
  class?: string,
  disabled?: boolean
}
export const PrimaryButton: FC<ButtonProp> = prop => {
  return (
    <button
      class={`btn btn-primary ${prop.class ?? ""}`}
      onClick={prop.onClick}
      type={prop.type}
      disabled={prop.disabled}
    >
      {prop.children}
    </button>
  )
}

export const SmallPrimaryButton: FC<ButtonProp> = prop => {
  return (
    <button
      class={`btn btn-primary btn-sm ${prop.class ?? ""}`}
      onClick={prop.onClick}
      type={prop.type}
      disabled={prop.disabled}
    >
      {prop.children}
    </button>
  )
}

export const SmallSecondaryButton: FC<ButtonProp> = prop => {
  return (
    <button
      class={`btn btn-secondary btn-sm ${prop.class ?? ""}`}
      onClick={prop.onClick}
      type={prop.type}
      disabled={prop.disabled}
    >
      {prop.children}
    </button>
  )
}

export const SecondaryButton: FC<ButtonProp> = prop => {
  return (
    <button
      class={`btn btn-secondary${prop.class ?? ""}`}
      onClick={prop.onClick}
      type={prop.type}
      disabled={prop.disabled}
    >
      {prop.children}
    </button>
  )
}



