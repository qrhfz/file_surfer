import { useContext, useEffect, useState } from "preact/hooks"
import { useGuard } from "../auth/useGuard"
import { Breadcrumb } from "../components/breadcrumb"
import { FolderView } from "../components/folder/folder_view"
import { LoadingCircle } from "../components/loading_circle"
import { Nav } from "../components/nav"
import { Sidebar } from "../components/sidebar"
import { FolderService } from "../generated-sources/openapi"
import { FolderLayout } from "../layout/folder_layout"
import { EntriesContext } from "../signals/entries_state"

import { joinPaths } from "../utils/path"


type Prop = { loc?: string, matches?: { q: string | undefined, in: string | undefined } }
type FolderPage = preact.FunctionalComponent<Prop>

export const FolderPage: FolderPage = ({ loc, matches }) => {
  useGuard()
  const entries = useContext(EntriesContext)
  const [status, setStatus] = useState<"loading" | "ok" | "error">("loading")

  const path = joinPaths(loc ?? '.')

  useEffect(() => {
    setStatus("loading")

    entries.sourceFn = async () => {
      const res = await FolderService.getFolder1(path)
      return res
    }

    entries.fetch().then(_ => setStatus("ok")).catch(_ => setStatus("error"))
  }, [path])

  return (
    <FolderLayout
      Header={() => <Nav q={matches?.q} at={matches?.in} />}
      Aside={() => <Sidebar loc={path} />}
      Main={() => (
        <>
          <div class="overflow-x-auto">
            <Breadcrumb path={path} />
            <FolderView
              loc={path}
              items={status == "loading" ? [] : entries.entriesSignal.value} />
          </div>
          {status == "loading" &&
            <div class="h-full grid items-center justify-center">
              <div>
                <LoadingCircle />
              </div>
            </div>
          }
        </>
      )}
    />
  )
}