import { FunctionComponent } from "preact";
import { useContext } from "preact/hooks";
import { BiFile, BiFolderPlus } from "react-icons/bi";
import { SmallSecondaryButton } from "../components/buttons";
import { SingleInputForm } from "../components/forms/single_input_form";
import { FileService } from "../generated-sources/openapi";
import { ModalContext } from "../signals/modal_state";
import { joinPath } from "../utils/path";
import { FolderContext } from "./folder_state";

export const Toolbar: FunctionComponent = () => {
  const folder = useContext(FolderContext)
  const modal = useContext(ModalContext)

  return (
    <div class="flex flex-row items-center gap-4 py-4 pr-2">
      <SmallSecondaryButton onClick={() => {
        modal.show(<NewFileForm path={folder.folderPath.value} />)
      }}>
        <div className="flex flex-row items-center gap-2">
          <BiFile /> New File

        </div>
      </SmallSecondaryButton>
      <SmallSecondaryButton onClick={() => {
        modal.show(<NewFolderForm path={folder.folderPath.value} />)
      }}>
        <div className="flex flex-row items-center gap-2">
          <BiFolderPlus /> New Folder
        </div>
      </SmallSecondaryButton>
      <div className="flex-grow" />
      <div>
        <span class="mr-2">Show Hidden Files</span>
        <input type="checkbox"
          checked={folder.showHidden.value}
          onChange={e => folder.showHidden.value = e.currentTarget.checked}
        />
      </div>


    </div>
  )
}

const NewFolderForm: FunctionComponent<{ path: string }> = ({ path }) => {
  return (
    <NewFileForm path={path} isDir={true} />
  )
}

const NewFileForm: FunctionComponent<{ path: string, isDir?: boolean }> = ({ path, isDir = false }) => {
  const modal = useContext(ModalContext)
  const folder = useContext(FolderContext)

  return (
    <SingleInputForm
      placeholder={isDir ? "New Folder Name" : "New File Name"}
      onSubmit={async (name) => {
        await FileService.postFile(encodeURIComponent(joinPath(path, name)), isDir)
      }}

      onDone={() => {
        modal.close();
        folder.refresh()
      }}
    />
  )
}