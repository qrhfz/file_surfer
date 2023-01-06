import { useContext, useEffect } from "preact/hooks"
import { useGuard } from "../auth/useGuard"
import { Breadcrumb } from "./breadcrumb"
import { FolderView } from "../components/folder/folder_view"
import { LoadingCircle } from "../components/loading_circle"
import { Nav } from "../components/nav"
import { Sidebar } from "../components/sidebar"
import { FolderLayout } from "../layout/folder_layout"

import { joinPaths } from "../utils/path"
import { FolderContext } from "./folder_state"


type Prop = { loc?: string, matches?: { q: string | undefined, in: string | undefined } }
type FolderPage = preact.FunctionalComponent<Prop>

export const FolderPage: FolderPage = ({ loc, matches }) => {
  useGuard()
  const folder = useContext(FolderContext)
  const path = joinPaths(loc ?? '.')

  useEffect(() => {
    console.log("fetch")
    folder.fetchFolder(path)
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
              items={folder.files.value} />
          </div>

          {folder.loading.value &&
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