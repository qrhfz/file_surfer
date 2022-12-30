import Router from "preact-router";
import { Redirect } from './components/redirect';
import { FileViewPage } from './pages/file_view_page';
import { FolderBrowserPage } from './pages/folder_browser_page';
import { Clipboard, ClipboardContext } from "./clipboard";
import { PopupContext, PopupState } from "./signals/popup_state";
import { Popup } from "./components/popup";



export function App() {

  return (
    <ClipboardContext.Provider value={new Clipboard()}>
      <PopupContext.Provider value={new PopupState()}>
        <PopupContext.Consumer>
          {p => {
            const Content = p.content.value
            if (Content) {
              return <Popup><Content /></Popup>;
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
