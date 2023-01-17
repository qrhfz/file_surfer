import { FunctionComponent } from "preact";
import { useContext, useState } from "preact/hooks";
import { BlobService } from "../generated-sources/openapi";
import { ModalContext } from "../signals/modal_state";
import { FolderContext } from "./folder_state";
import { TokenContext } from "../auth/tokenSignal";
import { BiCog, BiLogOut, BiUpload } from "react-icons/bi";
import { FC } from "preact/compat";
import { route } from "preact-router";


export const FolderSidebar: FunctionComponent<{ loc: string }> = ({ loc }) => {
  const modal = useContext(ModalContext)
  const token = useContext(TokenContext)

  return (
    <aside class="layout-i-side fixed bottom-0 md:static md:bottom-auto w-full md:w-auto bg-white shadow-sm md:shadow-none">
      <nav aria-label="SIdebar nav">
        <ul class="flex flex-row  justify-around md:flex-col py-2 whitespace-nowrap">
          <li>
            <Btn onClick={() => modal.show(
              <UploadFileForm path={loc} />
            )}>
              <BiUpload />
              <span class="hidden md:block">
                Upload File
              </span>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => route("/settings")}>
              <BiCog />
              <span class="hidden md:block">
                Settings
              </span>
            </Btn>
          </li>
          <li>
            <Btn onClick={() => token.value = null}>
              <BiLogOut />
              <span class="hidden md:block">
                Logout
              </span>
            </Btn>
          </li>
        </ul>
      </nav>
    </aside >
  )
}

const Btn: FC<{ onClick?: () => void }> = prop => {
  return (
    <button
      onClick={prop.onClick}
      class="flex flex-row gap-2 items-center w-full rounded-lg px-4 py-2 font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
      {prop.children}
    </button>
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