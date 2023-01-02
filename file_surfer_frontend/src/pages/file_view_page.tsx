import { useEffect, useState } from "preact/hooks"
import { PrimaryButton } from "../components/buttons"
import { AuthService, FileService } from "../generated-sources/openapi"
import { useAsync } from "../utils/useAsync"

type FilveViewPageType = preact.FunctionalComponent<{ loc?: string }>

export const FileViewPage: FilveViewPageType = ({ loc }) => {
  if (loc == undefined) {
    return <>Error</>
  }

  const fileState = useAsync(
    FileService.getFile(loc),
    {
      ok: ok => ok,
      err: err => err,
      key: loc
    }
  )

  return (
    <div class="w-screen h-screen bg-slate-300 pt-24">

      <div class="w-5/12 mx-auto bg-white p-8">
        {fileState.tag == "error" && "loading"}
        {fileState.tag == "loading" && "loading"}
        {fileState.tag == "ok" && <>
          <div className="flex flex-row justify-between pb-4 border-b-2 items-center">
            <h1 class="text-lg font-bold">{fileState.data.info?.name}</h1>
            <PrimaryButton onClick={async () => {
              const result = await AuthService.getAccessToken();

              if (result.accessToken) {
                window.open(`http://127.0.0.1:3100/blob?path=${fileState.data.info?.location}&accessToken=${result.accessToken}`)
              }

            }}>
              Download
            </PrimaryButton>
          </div>
          <div class="py-4 font-mono overflow-y-auto">

            {fileState.data.content}
          </div>
        </>}
      </div>
    </div>
  )
}