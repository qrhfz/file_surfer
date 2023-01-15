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
      <div class="flex flex-row items-stretch h-full">
        <div class="basis-2/12">
          <Aside />
        </div>
        <div class="basis-10/12 overflow-x-scroll">
          <Main />
        </div>
      </div>
    </div>
  )
};
