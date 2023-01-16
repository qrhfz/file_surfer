import { useComputed, useSignal } from "@preact/signals"
import { FunctionComponent } from "preact"
import { TargetedEvent } from "preact/compat"
import { BiCheck } from "react-icons/bi"
import { useGuard } from "../auth/useGuard"
import { SmallPrimaryButton } from "../components/buttons"
import { SimpleInput } from "../components/input/simple_input"
import { LoadingCircle } from "../components/loading_circle"
import { UserService } from "../generated-sources/openapi"
import { SingleColumnLayout } from "../layout/single_column_layout"

export const SettingsPage: FunctionComponent = () => {
  useGuard()

  const confirmPass = useSignal("")
  const newPass = useSignal("")
  const status = useSignal<"init" | "loading" | "error" | "ok">("init")

  const passMatch = useComputed(() => {
    return confirmPass.value === newPass.value
  })

  const submit = (e: TargetedEvent) => {
    e.preventDefault()
    status.value = "loading"
    UserService.patchCurrentUser({
      password: newPass.value
    }).then(() => status.value = "ok")
      .catch(() => status.value = "error")
  }

  return (
    <SingleColumnLayout>
      <h1 class="font-bold text-xl mb-4">Settings</h1>

      <h2 className="font-bold text-lg mb-2">Change Password</h2>

      <form
        className="grid grid-cols-2 items-center gap-2"
        onSubmit={submit}>
        <label>New Password</label>
        <SimpleInput
          type="password"
          value={newPass.value}
          handleChange={(v) => newPass.value = v}
        />
        <label>Confirm Password</label>
        <SimpleInput
          type="password"
          value={confirmPass.value}
          handleChange={(v) => confirmPass.value = v}
        />
        <div />
        <div class="flex flex-row py-4 gap-2 items-center">
          <SmallPrimaryButton
            type="submit"
            disabled={!passMatch.value}>
            Submit
          </SmallPrimaryButton>
          <div>
            {status.value === "loading"
              && <LoadingCircle size="32px" />}
          </div>
          {status.value === "ok"
            && <>Password Changed <BiCheck /> </>}
        </div>

      </form>
    </SingleColumnLayout>
  )
}