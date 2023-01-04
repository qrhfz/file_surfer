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
        {prop.title}
        {prop.subtitle}
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