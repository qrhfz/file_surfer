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



export function App() {

  useEffect(() => {
    OpenAPI.TOKEN = "aaaa"
    OpenAPI.BASE = "http://127.0.0.1:3100"
  }, [])

  return (
    <MultiProvider providers={[
      _ => <ClipboardContext.Provider value={new Clipboard()}>_</ClipboardContext.Provider>,
      _ => <PopupContext.Provider value={new PopupState()}>_</PopupContext.Provider>,
      _ => <TokenContext.Provider value={createTokenSignal()}>_</TokenContext.Provider>,
    ]}>
      <PopupContext.Consumer>
        {p => {
          const Popup = p.component.value
          if (Popup) {
            return <Popup></Popup>;
          }
        }}
      </PopupContext.Consumer>
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
  return (
    <>
      {providers.reduce((prev, next) => {
        return next(prev)
      }, providers[0](children))}
    </>
  )
}
