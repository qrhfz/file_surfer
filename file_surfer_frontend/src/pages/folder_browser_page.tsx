import { FolderView } from "../components/folder/folder_view"
import { Nav } from "../components/nav"
import { Sidebar } from "../components/sidebar"

type ThisPage = preact.FunctionalComponent<{ loc?: string }>

export const FolderBrowserPage: ThisPage = ({ loc }) => {
  return (
    <>
      <Nav />
      <div class="flex flex-row">
        <div class="w-64">

          <Sidebar />
        </div>
        <div class="overflow-x-auto">
          <FolderView loc={loc} />
        </div>
      </div>
    </>
  )
}

//path="/browse/:loc*" 