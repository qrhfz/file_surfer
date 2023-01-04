import Router from "preact-router";
import { Redirect } from './components/redirect';
import { FileViewPage } from './pages/file_view_page';
import { FolderBrowserPage } from './pages/folder_browser_page';
import { Clipboard, ClipboardContext } from "./clipboard";
import { PopupContext, PopupState } from "./signals/popup_state";
import { SearchPage } from "./pages/search_page";
import { LoginPage } from "./pages/login_page";
import { useEffect } from "preact/hooks";
import { OpenAPI } from "./generated-sources/openapi";
import { createTokenSignal, TokenContext } from "./auth/tokenSignal";
import { ComponentChildren, JSX } from "preact";
import { ModalContext, ModalState } from "./signals/modal_state";
import { Modal } from "./components/modals/modal";
import { EntriesContext, EntriesState } from "./signals/entries_state";
import { ColumnResizerContext, createColumnResizer } from "./components/folder/folder_view";


export function App() {
  return (
    <MultiProvider providers={[
      children => <ClipboardContext.Provider value={new Clipboard()}>
        {children}
      </ClipboardContext.Provider>,
      children => <TokenContext.Provider value={createTokenSignal()}>
        {children}
      </TokenContext.Provider>,
      children => <PopupContext.Provider value={new PopupState()}>
        {children}
      </PopupContext.Provider>,
      children => <ModalContext.Provider value={new ModalState()}>
        {children}
      </ModalContext.Provider>,
      children => <EntriesContext.Provider value={new EntriesState()}>
        {children}
      </EntriesContext.Provider>,
      children => <ColumnResizerContext.Provider value={createColumnResizer()}>
        {children}
      </ColumnResizerContext.Provider>
    ]}>
      <PopupContext.Consumer>
        {p => {
          const Popup = p.component.value
          if (Popup) {
            return <Popup></Popup>;
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
        <SearchPage path="/search" />
        <FolderBrowserPage path="/browse/:loc*" />
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
