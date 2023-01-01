import { useEffect, useState } from "preact/hooks"
import * as API from "../generated-sources/openapi"
import { useAsync } from "../utils/useAsync"

type FilveViewPageType = preact.FunctionalComponent<{ loc?: string }>

export const FileViewPage: FilveViewPageType = ({ loc }) => {
  if (loc == undefined) {
    return <>Error</>
  }

  const fileState = useAsync(API.FileService.getFile(loc), ok => ok, err => err, loc)

  return (
    <div class="w-screen h-screen bg-slate-300 pt-24">

      <div class="w-5/12 mx-auto bg-white p-4">
        {fileState.tag == "error" && "loading"}
        {fileState.tag == "loading" && "loading"}
        {fileState.tag == "ok" && <>
          <h1 class="text-lg font-bold">{fileState.data.info?.name}</h1>
          <hr class="pt-2" />
          {fileState.data.content}
        </>}
      </div>
    </div>
  )
}