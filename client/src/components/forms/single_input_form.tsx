import { FunctionComponent } from "preact"
import { useState } from "preact/hooks"
import { SmallPrimaryButton } from "../buttons"
import { SimpleInput } from "../input/simple_input"

type SingleInputFormProp = {
  placeholder: string,
  onSubmit: (_v: string) => Promise<void>,
  onDone: () => void
}
type SingleInputFormType = FunctionComponent<SingleInputFormProp>

export const SingleInputForm: SingleInputFormType = ({ onSubmit, placeholder, onDone }) => {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)


  return (
    <form onSubmit={e => e.preventDefault()}>
      <div class="flex flex-row gap-4">
        <SimpleInput
          value={name}
          handleChange={v => setName(v)}
          placeholder={placeholder}
          disabled={loading}
        />

        <SmallPrimaryButton
          onClick={async () => {
            if (loading) {
              return
            }
            setLoading(true)
            await onSubmit(name)
            setLoading(false)
            onDone()
          }}>
          Save
        </SmallPrimaryButton>
      </div>
      <div className="h-4">
        {loading && <span>loading...</span>}
      </div>
    </form>
  )
}