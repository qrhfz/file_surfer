import Router from "preact-router";
import { Redirect } from './components/redirect';
import { FileViewPage } from './file/file_view_page';
import { FolderPage } from './folder/folder_page';
import { PopupContext, PopupState } from "./components/popup/popup_state";
import { LoginPage } from "./pages/login_page";
import { createTokenSignal, TokenContext } from "./auth/tokenSignal";
import { ComponentChildren, Context, JSX, Provider } from "preact";
import { ModalContext, ModalState } from "./signals/modal_state";
import { Modal } from "./components/modals/modal";
import { ColumnResizerContext, createColumnResizer } from "./folder/folder_view";
import { Popup } from "./components/popup/popup";
import { FolderContext, FolderState } from "./folder/folder_state";
import { SearchPage } from "./search/search_page";
import { createContextItem, MultiProvider } from "./multiprovider";


export function App() {
  return (
    <MultiProvider
      contexts={[
        createContextItem(PopupContext, new PopupState()),
        createContextItem(ModalContext, new ModalState()),
        createContextItem(FolderContext, new FolderState()),
        createContextItem(TokenContext, createTokenSignal()),
        createContextItem(ColumnResizerContext, createColumnResizer()),
      ]}
    >
      <PopupContext.Consumer>
        {p => {
          const content = p.content.value
          if (content) {
            return <Popup>{content}</Popup>;
          }
        }}
      </PopupContext.Consumer>
      <ModalContext.Consumer>
        {m => {
          const modalContent = m.component.value
          return (<>{modalContent && <Modal>{modalContent}</Modal>}</>)
        }}
      </ModalContext.Consumer>
      <Router>
        <SearchPage path="/search" />
        <LoginPage path="/login" />
        <FolderPage path="/browse/:location*" />
        <FileViewPage path="/view/:loc*" />
        <Redirect path="/" to="/browse/" />
      </Router>

    </MultiProvider>
  )
}



