type SimpleInputProp = {
  placeholder: string,
  value: string,
  handleChange: (s: string) => void
}
type SimpleInput = preact.FunctionalComponent<SimpleInputProp>
export const SimpleInput: SimpleInput = ({ placeholder, value, handleChange }) => {
  return (
    <div class=" relative ">
      <input type="text"
        class="simple-input"
        placeholder={placeholder}
        value={value}
        onChange={e => handleChange((e.target as HTMLInputElement).value)}
      />
    </div>
  )
}