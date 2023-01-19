import Router from "preact-router";
import { Redirect } from './components/redirect';
import { FileViewPage } from './file/file_view_page';
import { FolderPage } from './folder/folder_page';
import { PopupContext } from "./components/popup/popup_state";
import { LoginPage } from "./auth/login_page";
import { ModalContext } from "./signals/modal_state";
import { Modal } from "./components/modals/modal";
import { Popup } from "./components/popup/popup";
import { SearchPage } from "./search/search_page";
import { useContext } from "preact/hooks";
import { SettingsPage } from "./settings/settings_page";


export function App() {
  const popup = useContext(PopupContext)
  const modal = useContext(ModalContext)

  return (
    <>
      {modal.component.value && <Modal>{modal.component.value}</Modal>}
      {popup.content.value && <Popup>{popup.content.value}</Popup>}
      <Router>
        <SearchPage path="/search" />
        <LoginPage path="/login" />
        <FolderPage path="/browse/:location*" />
        <FileViewPage path="/view/:loc*" />
        <SettingsPage path="/settings/:rest*" />
        <Redirect path="/" to="/browse/" />

      </Router>

    </>
  )
}



