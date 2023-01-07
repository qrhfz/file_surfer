import Router from "preact-router";
import { Redirect } from './components/redirect';
import { FileViewPage } from './file/file_view_page';
import { FolderPage } from './folder/folder_page';
import { PopupContext, PopupState } from "./components/popup/popup_state";
import { LoginPage } from "./pages/login_page";
import { createTokenSignal, TokenContext } from "./auth/tokenSignal";
import { ComponentChildren, JSX } from "preact";
import { ModalContext, ModalState } from "./signals/modal_state";
import { Modal } from "./components/modals/modal";
import { ColumnResizerContext, createColumnResizer } from "./folder/folder_view";
import { Popup } from "./components/popup/popup";
import { FolderContext, FolderState } from "./folder/folder_state";


export function App() {
  return (
    <MultiProvider providers={[
      children => <TokenContext.Provider value={createTokenSignal()}>
        {children}
      </TokenContext.Provider>,
      children => <PopupContext.Provider value={new PopupState()}>
        {children}
      </PopupContext.Provider>,
      children => <ModalContext.Provider value={new ModalState()}>
        {children}
      </ModalContext.Provider>,
      children => <FolderContext.Provider value={new FolderState()}>
        {children}
      </FolderContext.Provider>,
      children => <ColumnResizerContext.Provider value={createColumnResizer()}>
        {children}
      </ColumnResizerContext.Provider>
    ]}>
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
        <LoginPage path="/login" />
        <FolderPage path="/browse/:location*" />
        <FileViewPage path="/view/:loc*" />
        <Redirect path="/" to="/browse/" />
      </Router>

    </MultiProvider>
  )
}

type MultiProviderProp = {
  providers: ((children: ComponentChildren) => JSX.Element)[]
}
type MultiProvider = preact.FunctionalComponent<MultiProviderProp>
const MultiProvider: MultiProvider = (
  { children, providers }
) => {
  const first = providers.shift()
  return (
    <>
      {providers.reduce((prev, next) => {
        return next(prev)
      }, first!(children))}
    </>
  )
}
