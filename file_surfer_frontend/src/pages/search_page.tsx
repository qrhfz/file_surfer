import { FolderView } from "../components/folder/folder_view"
import { Nav } from "../components/nav"
import { LoadingCircle } from "../components/loading_circle"
import { FolderLayout } from "../layout/folder_layout"
import { useContext, useEffect, useState } from "preact/hooks"
import { EntriesContext } from "../signals/entries_state"

type Prop = { matches?: { q: string | undefined, in: string | undefined } }

type SearchPage = preact.FunctionalComponent<Prop>

export const SearchPage: SearchPage = ({ matches }) => {
  const query = matches?.q
  const path = matches?.in

  if (query === undefined || path === undefined) {
    return <>Error</>
  }

  const entries = useContext(EntriesContext)
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading")

  // useEffect(() => {
  //   setStatus("loading")

  //   entries.sourceFn = () => SearchService.getSearch(path, query)
  //     .then(body => mergeFilesAndFolders(body.files ?? [], body.folders ?? []))

  //   entries.fetch().then(_ => setStatus("ok")).catch(_ => setStatus("error"))
  // }, [path, query])

  return (
    <FolderLayout
      Header={() => <Nav q={matches?.q} at={matches?.in} />}
      Aside={() => <></>}
      Main={() => {
        if (status === "loading") {
          return <LoadingCircle></LoadingCircle>
        } else if (status === "ok") {
          return (
            <div class="overflow-x-auto">
              <FolderView items={entries.entriesSignal.value} />
            </div>
          )
        } else {
          return <>Error</>
        }
      }}
    />
  )
}