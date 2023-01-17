import { ComponentType, FunctionComponent } from "preact";
type FolderLayoutType = FunctionComponent<{
  Header: ComponentType,
  Aside: ComponentType,
  Main: ComponentType
}>
export const FolderLayout: FolderLayoutType = ({ Header, Main, Aside }) => {
  return (
    <div class="flex flex-col h-screen">
      <Header />
      <div class="flex flex-row items-stretch">
        <div class="basis-2/12">
          <Aside />
        </div>
        <div class="basis-10/12">
          <Main />
        </div>
      </div>
    </div>
  )
};
