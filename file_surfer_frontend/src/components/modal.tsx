import { FunctionComponent } from "preact"
import { useContext } from "preact/hooks"
import { ModalContext } from "../signals/modal_state"

export const Modal: FunctionComponent = ({ children }) => {
  const modal = useContext(ModalContext);

  return (
    <div
      onClick={e => {
        e.preventDefault()
        if (e.currentTarget === e.target) {
          modal.close()
        }
      }}
      className="fixed h-screen w-screen bg-neutral-900 bg-opacity-80 z-50
      grid items-center justify-center">
      <div class="relative rounded-lg border border-gray-200 shadow-lg bg-white">
        <button
          onClick={() => modal.close()}
          class="absolute -top-1 -right-1 rounded-full border border-gray-300 bg-gray-100 p-1"
        >
          <span class="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <div class="flex items-center p-4">
          {children}
        </div>
      </div>

    </div>
  )
}