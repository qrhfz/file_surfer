import { FolderView } from './components/folder/folder_view'
import { Nav } from './components/nav'
import { Sidebar } from './components/sidebar'
import Router from "preact-router";
import { Redirect } from './components/redirect';

export function App() {
  return (
    <>
      <Nav />
      <div class="flex flex-row">

        <div class="w-64">
          <Sidebar />
        </div>
        <div class="overflow-x-auto">
          <Router>
            <FolderView path="/browse/:loc*" />
            <Redirect path="/" to="/browse/" />
          </Router>
        </div>
      </div>
    </>
  )
}
