import { FunctionComponent } from "preact";
import { useContext, useState } from "preact/hooks";
import { BlobService } from "../generated-sources/openapi";
import { ModalContext } from "../signals/modal_state";
import { PrimaryButton } from "../components/buttons";
import { FolderContext } from "./folder_state";
import { TokenContext } from "../auth/tokenSignal";


export const FolderSidebar: FunctionComponent<{ loc: string }> = ({ loc }) => {
  const modal = useContext(ModalContext)
  const token = useContext(TokenContext)

  return (
    <aside class="layout-i-side w-64 p-4">
      <div className="p-4 flex flex-col flex-shrink gap-4">
        <PrimaryButton onClick={() => {
          modal.show(
            <UploadFileForm path={loc} />
          );
        }}>
          Upload File
        </PrimaryButton>

      </div>

      <nav
        aria-label="Main Nav"
        class="-my-2 flex flex-col divide-y divide-gray-100">
        <ul class="space-y-1 py-2">
          <li>
            <a
              href="/settings"
              class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Settings
            </a>
          </li>
        </ul>

        <div class="py-2">
          <button
            onClick={() => token.value = null}
            class="block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
            Logout
          </button>
        </div>
      </nav>

    </aside >
  )
}






const UploadFileForm: FunctionComponent<{ path: string }> = ({ path }) => {
  const [files, setFiles] = useState<FileList>()
  const folder = useContext(FolderContext)
  const modal = useContext(ModalContext)
  return (
    <div>
      <form onSubmit={async e => {
        e.preventDefault()
        const blobs: Blob[] = []

        if (!files) {
          return
        }

        for (let i = 0; i < files.length; i++) {
          const file = files.item(i);
          if (file) {
            blobs.push(file)
          }
        }
        modal.close()
        await BlobService.upload({ path: encodeURIComponent(path), files: blobs })
        folder.refresh()
      }}>
        <input
          type="file"
          name="files"
          onChange={e => {
            const files = e.currentTarget.files
            files && setFiles(files)
          }}
          multiple
        />
        <button type="submit" >upload</button>
      </form>
    </div>
  )
}