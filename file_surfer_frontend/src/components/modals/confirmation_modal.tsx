import { FunctionComponent } from "preact";
import { SmallPrimaryButton, SmallSecondaryButton } from "../buttons";

type Prop = {
  title: string,
  subtitle: string,
  onConfirm: () => void,
  onCancel: () => void
}

const ConfirmationModal: FunctionComponent<Prop> = prop => {
  return (
    <>
      <div class="text-center">
        <div className="font-bold text-lg">
          <p>{prop.title}</p>
        </div>
        <div>
          <p>{prop.subtitle}</p>
        </div>
      </div>
      <div className="flex mt-4 flex-row justify-end gap-4">
        <SmallPrimaryButton onClick={prop.onConfirm}>
          Confirm
        </SmallPrimaryButton>
        <SmallSecondaryButton onClick={prop.onCancel}>
          Cancel
        </SmallSecondaryButton>
      </div>
    </>
  )
}