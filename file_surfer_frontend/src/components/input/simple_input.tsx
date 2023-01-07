type SimpleInputProp = {
  placeholder: string,
  value: string,
  disabled?: boolean,
  handleChange: (s: string) => void
}
type SimpleInput = preact.FunctionalComponent<SimpleInputProp>
export const SimpleInput: SimpleInput = (prop) => {
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