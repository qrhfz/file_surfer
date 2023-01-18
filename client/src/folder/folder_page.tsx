import { useContext, useEffect } from "preact/hooks"
import { useGuard } from "../auth/useGuard"
import { FolderView } from "./folder_view"
import { LoadingCircle } from "../components/loading_circle"
import { Nav } from "./nav"
import { FolderSidebar } from "./folder_sidebar"

import { joinPaths } from "../utils/path"
import { FolderContext } from "./folder_state"
import { PopupContext } from "../components/popup/popup_state"
import { FunctionalComponent } from "preact";
import { Toolbar } from "./toolbar"
import { AsyncState } from "../utils/useAsync"
import { FC } from "preact/compat"
import { File } from "../generated-sources/openapi"


type Prop = { location?: string, matches?: { q: string | undefined, in: string | undefined } }
type FolderPageType = FunctionalComponent<Prop>

export const FolderPage: FolderPageType = ({ location, matches }) => {
  const { authenticated } = useGuard()

  const folder = useContext(FolderContext)
  const path = joinPaths(location ?? '')

  useEffect(() => {
    if (authenticated.value) {
      folder.fetchFolder(path).catch()
    }
  }, [path, authenticated.value])

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
    <div class="lg:layout-lside" >
      <Nav q={matches?.q} at={matches?.in} />
      <FolderSidebar loc={path} />
      <main class="layout-i-main min-w-0 min-h-0 flex flex-col">
        <Content files={folder.files.value} />
      </main>
    </div>
  )
}

const Content: FC<{ files: AsyncState<File[], string> }> = ({ files }) => {
  switch (files.status) {
    case "error":
      return <pre>{files.error}</pre>;
    case "loading":
      return (<div><LoadingCircle /></div>);
    case "ok":
      return (
        <>
          <div class="mb-4">
            <Toolbar />
          </div>
          <FolderView />
        </>
      )
    default:
      return <></>
  }
}