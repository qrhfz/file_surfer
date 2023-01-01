import { useEffect, useState } from "preact/hooks"
import { FolderView } from "../components/folder/folder_view"
import { FileOrFolder } from "../components/folder/model"
import { Nav } from "../components/nav"
import { Sidebar } from "../components/sidebar"
import { FolderService } from "../generated-sources/openapi"

type ThisPage = preact.FunctionalComponent<{ loc?: string }>


export const FolderBrowserPage: ThisPage = ({ loc }) => {
  if (loc === undefined) {
    return <>Error</>
  }

  const [items, setItems] = useState<FileOrFolder[]>([])

  useEffect(() => {
    FolderService.getFolder(loc === "" ? "/" : loc).then(body => {
      const files: FileOrFolder[] = (body.files ?? [])
        .map((f) => ({ tag: "file", item: f, }))
      const folders: FileOrFolder[] = (body.folders ?? [])
        .map((f) => ({ tag: "folder", item: f, }))
      setItems([...folders, ...files])
    })
  }, [loc])
  return (
    <div>
      <Nav />
      <div class="flex flex-row">
        <div class="w-64">
          <Sidebar />
        </div>
        <div class="overflow-x-auto">
          <FolderView loc={loc} items={items} />
        </div>
      </div>
    </div>
  )
}

//path="/browse/:loc*" 