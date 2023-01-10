import { useContext, useEffect } from "preact/hooks"
import { useGuard } from "../auth/useGuard"
import { Breadcrumb } from "./breadcrumb"
import { FolderView } from "./folder_view"
import { LoadingCircle } from "../components/loading_circle"
import { Nav } from "../components/nav"
import { FolderSidebar } from "./folder_sidebar"
import { FolderLayout } from "../layout/folder_layout"

import { joinPaths } from "../utils/path"
import { FolderContext } from "./folder_state"
import { PopupContext } from "../components/popup/popup_state"
import { FunctionalComponent } from "preact";
// import { effect } from "@preact/signals"


type Prop = { location?: string, matches?: { q: string | undefined, in: string | undefined } }
type FolderPageType = FunctionalComponent<Prop>

export const FolderPage: FolderPageType = ({ location, matches }) => {
  const { authenticated } = useGuard()


  const folder = useContext(FolderContext)
  const path = joinPaths(location ?? '')

  useEffect(() => {
    if (authenticated) {
      folder.fetchFolder(path)
    }
  }, [path])

  const popup = useContext(PopupContext)
  useEffect(() => {
    switch (folder.fileOp.value?.status) {
      case "ok":
        popup.show(<>Ok</>)
        break;
      case "loading":
        popup.show(<>Loading</>)
        break;
      case "error":
        popup.show(
          <div class="text-red-600 text-2x">
            ERROR
          </div>
        )
        break;
    }
  }, [folder.fileOp.value?.status])

  return (
    <FolderLayout
      Header={() => <Nav q={matches?.q} at={matches?.in} />}
      Aside={() => <FolderSidebar loc={path} />}
      Main={() => {

        if (folder.err.value) {
          return (
            <pre>{folder.err.value}</pre>
          )
        }

        return (
          <>
            <div class="flex flex-col h-full p-4">
              <Breadcrumb path={path} />
              <FolderView />
            </div>
            {folder.loading.value &&
              <div class="h-full grid items-center justify-center">
                <div>
                  <LoadingCircle />
                </div>
              </div>}
          </>
        )
      }}
    />
  )
}