import { useEffect, useState } from "preact/hooks"
import * as API from "../generated-sources/openapi"

type FilveViewPageType = preact.FunctionalComponent<{ loc?: string }>

export const FileViewPage: FilveViewPageType = ({ loc }) => {
  const [file, setFile] = useState<API.File>({})
  const [content, setContent] = useState<string>("")


  useEffect(() => {
    API.FileService.getFile(loc).then(f => {
      if (f.info) {
        setFile(f.info)
      }
      if (f.content) {
        setContent(f.content)
      }
    }).catch(e => setContent("error"))
  }, [])

  return (
    <div class="w-screen h-screen bg-slate-300 pt-24">

      <div class="w-5/12 mx-auto bg-white p-4">
        <h1 class="text-lg font-bold">{file.name}</h1>
        <hr class="pt-2" />
        <div>
          {content}
        </div>
      </div>

    </div>
  )
}