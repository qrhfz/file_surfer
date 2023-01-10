import { useSignal } from "@preact/signals"
import { FunctionComponent } from "preact"
import { useEffect } from "preact/hooks"
import { SmallPrimaryButton } from "../components/buttons"
import { AuthService, BlobService, File, FileService } from "../generated-sources/openapi"
import { useAsync } from "../utils/useAsync"

type FilveViewPageType = FunctionComponent<{ loc?: string }>

export const FileViewPage: FilveViewPageType = ({ loc }) => {
  const fileState = useAsync(
    FileService.getFile(encodeURIComponent(loc!)),
    {
      ok: ok => ok,
      err: err => err,
      key: loc
    }
  )

  const accessToken = useSignal<string | undefined>(undefined)
  useEffect(() => {
    AuthService.getAccessToken()
      .then(res => accessToken.value = res.accessToken)
  }, [])

  return (
    <div class="w-screen h-screen bg-slate-300 pt-24 overflow-y-scroll">

      <div class="w-8/12 mx-auto bg-white p-8 ">
        {fileState.status == "error" && JSON.stringify(fileState.error)}
        {fileState.status == "loading" && "loading"}
        {fileState.status == "ok" && <>
          <div className="flex flex-row justify-between pb-4 border-b-2 items-center">
            <h1 class="text-lg font-bold">{fileState.data?.name}</h1>
            <SmallPrimaryButton onClick={async () => {
              window.open(`http://localhost:3000/file/${loc}/blob?accessToken=${accessToken}`)
            }}>
              Download
            </SmallPrimaryButton>
          </div>
          {accessToken.value && <Content path={loc!} file={fileState.data} accessToken={accessToken.value} />}
        </>}
      </div>
    </div>
  )
}

const Content: FunctionComponent<{ path: string, file: File, accessToken: string }> = prop => {
  const type = prop.file.type
  const isText = type.startsWith("text/")
  const isImage = type.startsWith("image/")

  return (
    <div class="py-4 h-[66vh] overflow-y-auto">
      {isText && <TextFile path={prop.path} />}
      {isImage && <div >
        <img class="mx-auto" src={`http://localhost:3000/file/${prop.path}/blob?accessToken=${prop.accessToken}`} />
      </div>}
    </div>
  )
}

const TextFile: FunctionComponent<{ path: string }> = ({ path }) => {
  const text = useAsync(
    BlobService.getBlob(encodeURIComponent(path)),
    {
      ok: ok => ok,
      err: err => err,
      key: path
    }
  )

  return (
    <pre>
      {text.status === "ok" && text.data}
    </pre>
  )
}