import { useSignal } from "@preact/signals"
import { FunctionComponent } from "preact"
import { SmallPrimaryButton } from "../components/buttons"
import { SimpleInput } from "../components/input/simple_input"
import { SingleColumnLayout } from "../layout/single_column_layout"

export const SettingsPage: FunctionComponent = () => {
  const oldPass = useSignal("")
  const newPass = useSignal("")

  return (
    <SingleColumnLayout>
      <h1 class="font-bold text-xl mb-4">Settings</h1>

      <h2 className="font-bold text-lg mb-2">Change Password</h2>

      <form
        className="grid grid-cols-2 items-center gap-2"
        onSubmit={e => {
          e.preventDefault()
          // UserService.patchUser()
        }}
      >
        <label>Old Password</label>
        <SimpleInput
          type="password"
          value={oldPass.value}
          handleChange={(v) => oldPass.value = v}
        />
        <label>New Password</label>
        <SimpleInput
          type="password"
          value={newPass.value}
          handleChange={(v) => newPass.value = v}
        />
        <div />
        <div class="py-4">
          <SmallPrimaryButton
            type="submit">
            Submit
          </SmallPrimaryButton>
        </div>

      </form>
    </SingleColumnLayout>
  )
}