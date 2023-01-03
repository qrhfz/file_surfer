import { useEffect, useState } from "preact/hooks"
import { useGuard } from "../auth/useGuard"
import { Breadcrumb } from "../components/breadcrumb"
import { FolderView } from "../components/folder/folder_view"
import { FileOrFolder } from "../components/folder/model"
import { LoadingCircle } from "../components/loading_circle"
import { Nav } from "../components/nav"
import { Sidebar } from "../components/sidebar"
import { FolderService } from "../generated-sources/openapi"
import { FolderLayout } from "../layout/folder_layout"
import { mergeFilesAndFolders } from "../utils/mergeFilesAndFolders"
import { joinPath, joinPaths } from "../utils/path"
import { useAsync } from "../utils/useAsync"

type Prop = { loc?: string, matches?: { q: string | undefined, in: string | undefined } }
type FolderBrowserPage = preact.FunctionalComponent<Prop>

export const FolderBrowserPage: FolderBrowserPage = ({ loc, matches }) => {
  useGuard()

  const path = joinPaths("/", loc ?? '.')

  const task = FolderService.getFolder(path)

  const result = useAsync(task, {
    ok: body => mergeFilesAndFolders(body.files ?? [], body.folders ?? []),
    err: e => e,
    key: loc,
  })
  return (
    <FolderLayout
      Header={() => <Nav q={matches?.q} at={matches?.in} />}
      Aside={() => <Sidebar loc={loc!} />}
      Main={() => {
        if (result.tag === "loading") {
          return <LoadingCircle></LoadingCircle>
        } else if (result.tag === "ok") {
          return (
            <div class="overflow-x-auto">
              <Breadcrumb path={path} />
              <FolderView items={result.data} loc={path} />
            </div>
          )
        } else {
          return <>Error</>
        }
      }}
    />
  )
}