import { FolderView } from "../components/folder/folder_view"
import { FileOrFolder } from "../components/folder/model"
import { Nav } from "../components/nav"
import { Sidebar } from "../components/sidebar"
import { SearchService } from "../generated-sources/openapi"
import { useAsync } from "../utils/useAsync"
import { BiLoaderCircle } from "react-icons/bi";
import { LoadingCircle } from "../components/loading_circle"
import { FolderLayout } from "../layout/folder_layout"

type Prop = { matches?: { q: string | undefined, in: string | undefined } }

type SearchPage = preact.FunctionalComponent<Prop>

export const SearchPage: SearchPage = ({ matches }) => {

  if ((matches?.q) === undefined) {
    return <>Error</>
  }

  const task = SearchService.getSearch(matches?.in ?? '', matches?.q)

  const result = useAsync(task, body => {
    const files: FileOrFolder[] = (body.files ?? [])
      .map((f) => ({ tag: "file", item: f, }))
    const folders: FileOrFolder[] = (body.folders ?? [])
      .map((f) => ({ tag: "folder", item: f, }))
    return [...folders, ...files]
  }, e => e, matches?.q)

  return (
    <FolderLayout
      Header={() => <Nav q={matches?.q} at={matches?.in} />}
      Aside={() => <></>}
      Main={() => {
        if (result.tag === "loading") {
          return <LoadingCircle></LoadingCircle>
        } else if (result.tag === "ok") {
          return (
            <div class="overflow-x-auto">
              <FolderView items={result.data} />
            </div>
          )
        } else {
          return <>Error</>
        }
      }}
    />
  )
}