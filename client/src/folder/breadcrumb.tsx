import { FunctionComponent } from "preact";
import Match from 'preact-router/match';
import { useContext } from "preact/hooks";
import { buildPath, comparePath, joinPath, parsePath } from "../utils/path";
import { FolderContext } from "./folder_state";


export const Breadcrumb: FunctionComponent = () => {
  const folder = useContext(FolderContext)
  const path = folder.folderPath.value

  const segments = parsePath(path)
  return (
    <nav aria-label="Breadcrumb" class="flex py-2">
      <ol
        role="list"
        class="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
        <Match key={path} path={path}>
          {
            (match: { url: string }) => {
              return comparePath(match.url, "/browse")
                ? <BreadcrumbItemActive path="/browse/">/</BreadcrumbItemActive>
                : <BreadcrumbItemNonActive path="/browse/">/</BreadcrumbItemNonActive>;
            }
          }
        </Match>
        {segments.map((s, i) => {
          const relativePath = buildPath(segments.slice(0, i + 1))
          const path = joinPath('/browse/', relativePath)
          return (
            <Match key={path} path={path}>
              {
                (match: { url: string }) => {
                  return comparePath(match.url, path)
                    ? <BreadcrumbItemActive path={path}>{s}</BreadcrumbItemActive>
                    : <BreadcrumbItemNonActive path={path}>{s}</BreadcrumbItemNonActive>;
                }
              }
            </Match>
          );
        })}
      </ol>
    </nav>
  )
};

const BreadcrumbItemActive: FunctionComponent<{ path: string }> = ({ children, path }) => {
  return (
    <li class="relative flex items-center">
      <span
        class="absolute inset-y-0 -left-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)]"
      />
      <a
        href={path}
        class="active | flex h-10 items-center bg-white pl-8 pr-4 text-xs font-medium transition hover:text-gray-900"
      >
        {children}
      </a>
    </li>
  )
}

const BreadcrumbItemNonActive: FunctionComponent<{ path: string }> = ({ children, path }) => {
  return (
    <li class="relative flex items-center">
      <a
        href={path}
        class="flex h-10 items-center bg-gray-100  pl-8 pr-4 text-xs font-medium transition hover:text-gray-900"
      >
        {children}
      </a>
    </li>
  )
}
