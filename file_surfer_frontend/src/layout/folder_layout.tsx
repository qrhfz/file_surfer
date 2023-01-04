import { ComponentType, FunctionComponent } from "preact";
type FolderLayout = { Header: ComponentType, Aside: ComponentType, Main: ComponentType }
export const FolderLayout: FunctionComponent<FolderLayout> = ({ Header, Main, Aside }) => {
  return (
    <div>
      <Header />
      <div class="flex flex-row">
        <div class="w-64 pr-4">
          <Aside />
        </div>
        <div>
          <Main />
        </div>
      </div>
    </div>
  )
};
