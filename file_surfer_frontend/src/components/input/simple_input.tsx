import { FunctionComponent } from "preact";

type SimpleInputProp = {
  placeholder: string,
  value: string,
  disabled?: boolean,
  handleChange: (_s: string) => void
}
type SimpleInputType = FunctionComponent<SimpleInputProp>
export const SimpleInput: SimpleInputType = (prop) => {
  const { placeholder, value, handleChange, disabled = false } = prop
  return (
    <input
      type="text"
      class="simple-input"
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      onChange={e => handleChange(e.currentTarget.value)} />
  )
}