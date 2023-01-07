import { useEffect, useState } from "preact/hooks"
import { PrimaryButton } from "../components/buttons"
import { AuthService, FileService } from "../generated-sources/openapi"
import { joinPath } from "../utils/path"
import { useAsync } from "../utils/useAsync"

type FilveViewPageType = preact.FunctionalComponent<{ loc?: string }>

export const FileViewPage: FilveViewPageType = ({ loc }) => {
  const path = joinPath('/', loc ?? '.')

  const fileState = useAsync(
    FileService.getFile(path),
    {
      ok: ok => ok,
      err: err => err,
      key: path
    }
  )

  return (
    <div class="w-screen h-screen bg-slate-300 pt-24">

      <div class="w-8/12 mx-auto bg-white p-8  ">
        {fileState.status == "error" && "loading"}
        {fileState.status == "loading" && "loading"}
        {fileState.status == "ok" && <>
          <div className="flex flex-row justify-between pb-4 border-b-2 items-center">
            <h1 class="text-lg font-bold">{fileState.data?.name}</h1>
            <PrimaryButton onClick={async () => {
              const result = await AuthService.getAccessToken();

              if (result.accessToken) {
                window.open(`http://127.0.0.1:3100/blob?path=${fileState.data?.location}&accessToken=${result.accessToken}`)
              }

            }}>
              Download
            </PrimaryButton>
          </div>
          <pre class="py-4 h-[66vh] overflow-y-auto">

          </pre>
        </>}
      </div>
    </div>
  )
}