import { FunctionComponent } from "preact"
import { useContext, useState } from "preact/hooks"
import { ModalContext } from "../../signals/modal_state"
import { PrimaryButton, SmallPrimaryButton } from "../buttons"
import { SimpleInput } from "../input/simple_input"

type SingleInputFormProp = {
  placeholder: string,
  onSubmit: (v: string) => Promise<void>,
  onDone: () => void
}
type SingleInputForm = FunctionComponent<SingleInputFormProp>

export const SingleInputForm: SingleInputForm = ({ onSubmit, placeholder, onDone }) => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)


  return (
    <form onSubmit={e => e.preventDefault()}>
      <div class="relative">
        <SimpleInput
          value={name}
          handleChange={v => setName(v)}
          placeholder={placeholder}
        />
      </div>
      <div className="h-4"></div>
      <div className="flex flex-row justify-between">
        <div>
          {loading && <span>loading...</span>}
        </div>
        <SmallPrimaryButton onClick={async () => {
          setLoading(true)
          await onSubmit(name)
          setLoading(false)
          onDone()
        }}>
          Save
        </SmallPrimaryButton>
      </div>
    </form>
  )
}