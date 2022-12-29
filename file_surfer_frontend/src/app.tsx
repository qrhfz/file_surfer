import Router from "preact-router";
import { Redirect } from './components/redirect';
import { FileViewPage } from './pages/file_view_page';
import { FolderBrowserPage } from './pages/folder_browser_page';
import { MarkedFilesState, MarkedFilesContext } from "./file_marking";



export function App() {
  return (
    <MarkedFilesContext.Provider value={new MarkedFilesState()}>
      <Router>
        <FolderBrowserPage path="/browse/:loc*" />
        <FileViewPage path="/view/:loc*" />
        <Redirect path="/" to="/browse/" />
      </Router>
    </MarkedFilesContext.Provider>
  )
}
