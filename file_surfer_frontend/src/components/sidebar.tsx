import { FunctionComponent } from "preact";
import { route, useRouter } from "preact-router";
import { useContext, useState } from "preact/hooks";
import { BiFolder } from "react-icons/bi";
import { FileService } from "../generated-sources/openapi";
import { EntriesContext } from "../signals/entries_state";
import { ModalContext } from "../signals/modal_state";
import { PrimaryButton, SecondaryButton } from "./buttons";
import { SingleInputForm } from "./forms/single_input_form";
import { SimpleInput } from "./input/simple_input";

export const Sidebar: FunctionComponent<{ loc: string }> = ({ loc }) => {
  const modal = useContext(ModalContext)

  return (
    <aside class="p-4">
      <div className="p-4 flex flex-col flex-shrink gap-4">
        <PrimaryButton onClick={() => modal.show(<>
          upload file
        </>)}>
          Upload File
        </PrimaryButton>
        <SecondaryButton onClick={() => (modal.show(<NewFileForm path={loc} />))}>
          New File
        </SecondaryButton>
        <SecondaryButton onClick={() => (modal.show(<NewFolderForm path={loc} />))}>
          New Folder
        </SecondaryButton>
      </div>

      <nav
        aria-label="Main Nav"
        class="-my-2 flex flex-col divide-y divide-gray-100">
        <ul class="space-y-1 py-2">
          <li>
            <a
              href=""
              class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Settings
            </a>
          </li>
        </ul>

        <div class="py-2">
          <form action="/logout">
            <button
              type="submit"
              class="block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Logout
            </button>
          </form>
        </div>
      </nav>

    </aside >
  )
}




const NewFolderForm: FunctionComponent<{ path: string }> = ({ path }) => {
  return (
    <NewFileForm path={path} isDir={true} />
  )
}

const NewFileForm: FunctionComponent<{ path: string, isDir?: boolean }> = ({ path, isDir = false }) => {
  const modal = useContext(ModalContext)
  const entries = useContext(EntriesContext)

  return (
    <SingleInputForm
      placeholder={isDir ? "New Folder Name" : "New File Name"}
      onSubmit={async (name) => {
        await FileService.postFile(path, { name, isDir: isDir })
      }}

      onDone={() => {
        modal.close();
        entries.fetch();
      }} />
  )
}