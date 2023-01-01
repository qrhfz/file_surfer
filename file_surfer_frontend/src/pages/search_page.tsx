import { FolderView } from "../components/folder/folder_view"
import { FileOrFolder } from "../components/folder/model"
import { Nav } from "../components/nav"
import { Sidebar } from "../components/sidebar"
import { SearchService } from "../generated-sources/openapi"
import { useAsync } from "../utils/useAsync"

type ThisPage = preact.FunctionalComponent<{ loc?: string, matches?: { query: string | undefined } }>

export const SearchPage: ThisPage = ({ loc, matches }) => {
  const task = SearchService.getSearch(loc, matches?.query)
  const result = useAsync(task, body => {
    const files: FileOrFolder[] = (body.files ?? [])
      .map((f) => ({ tag: "file", item: f, }))
    const folders: FileOrFolder[] = (body.folders ?? [])
      .map((f) => ({ tag: "folder", item: f, }))
    return [...folders, ...files]
  }, e => e)

  return (
    <div>
      <Nav />
      <div class="flex flex-row">
        <div class="w-64">
          <Sidebar />
        </div>
        <div class="overflow-x-auto">

          {result.tag == "ok" && <FolderView loc={loc} items={result.data} />}
        </div>
      </div>
    </div>
  )
}

//path="/browse/:loc*" 