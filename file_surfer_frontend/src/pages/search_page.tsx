import { FolderView } from "../components/folder/folder_view"
import { Nav } from "../components/nav"
import { SearchService } from "../generated-sources/openapi"
import { useAsync } from "../utils/useAsync"
import { LoadingCircle } from "../components/loading_circle"
import { FolderLayout } from "../layout/folder_layout"
import { mergeFilesAndFolders } from "../utils/mergeFilesAndFolders"

type Prop = { matches?: { q: string | undefined, in: string | undefined } }

type SearchPage = preact.FunctionalComponent<Prop>

export const SearchPage: SearchPage = ({ matches }) => {

  if ((matches?.q) === undefined) {
    return <>Error</>
  }

  const task = SearchService.getSearch(matches?.in ?? '', matches?.q)

  const result = useAsync(task, {
    ok: body => mergeFilesAndFolders(body.files ?? [], body.folders ?? []),
    err: e => e,
    key: matches.q
  })

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