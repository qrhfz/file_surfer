import { FunctionComponent } from "preact";
import { route } from "preact-router";
import { buildPath, joinPath, parsePath } from "../utils/path";

type BreadcrumbProp = { path: string }

export const Breadcrumb: FunctionComponent<BreadcrumbProp> = ({ path }) => {
  const segments = parsePath(path)
  console.log(path)
  console.log(segments)
  return (
    <nav aria-label="Breadcrumb" class="flex">
      <ol
        role="list"
        class="flex overflow-hidden rounded-lg border border-gray-200 text-gray-600">
        {segments.map((s, i) => (
          <BreadcrumbItem onClick={() => {
            const path = joinPath('/browse', buildPath(segments.slice(0, i + 1)))
            route(path)
          }}>
            {s}
          </BreadcrumbItem>
        ))}

      </ol>
    </nav>
  )
};

type BreadcrumbItemProp = { onClick: () => void }

const BreadcrumbItem: FunctionComponent<BreadcrumbItemProp> = ({ children, onClick }) => {
  return (
    <li onClick={onClick} class="relative flex items-center">
      <span
        class="absolute inset-y-0 -left-px h-10 w-4 bg-gray-100 [clip-path:_polygon(0_0,_0%_100%,_100%_50%)]"
      >
      </span>

      <a
        href="#"
        class="flex h-10 items-center bg-white pl-8 pr-4 text-xs font-medium transition hover:text-gray-900"
      >
        {children}
      </a>
    </li>
  )
}
