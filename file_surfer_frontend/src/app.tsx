import Router from "preact-router";
import { Redirect } from './components/redirect';
import { FileViewPage } from './pages/file_view_page';
import { FolderBrowserPage } from './pages/folder_browser_page';
import { Clipboard, ClipboardContext } from "./clipboard";
import { PopupContext, PopupState } from "./signals/popup_state";



export function App() {

  return (
    <ClipboardContext.Provider value={new Clipboard()}>
      <PopupContext.Provider value={new PopupState()}>
        <PopupContext.Consumer>
          {p => {
            const Popup = p.component.value
            if (Popup) {
              return <Popup></Popup>;
            }
          }}
        </PopupContext.Consumer>
        <Router>
          <FolderBrowserPage path="/browse/:loc*" />
          <FileViewPage path="/view/:loc*" />
          <Redirect path="/" to="/browse/" />
        </Router>
      </PopupContext.Provider>
    </ClipboardContext.Provider>
  )
}
