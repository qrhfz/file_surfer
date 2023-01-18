import { useSignal } from "@preact/signals"
import { FunctionComponent } from "preact"
import { useEffect } from "preact/hooks"
import { useGuard } from "../auth/useGuard"
import { SmallPrimaryButton } from "../components/buttons"
import { AuthService, File, FileService, OpenAPI } from "../generated-sources/openapi"
import { useAsync } from "../utils/useAsync"

type FilveViewPageType = FunctionComponent<{ loc?: string }>

export const FileViewPage: FilveViewPageType = prop => {
  useGuard()

  const path = prop.loc ?? ""
  const encodedPath = encodeURIComponent(path)

  const fileState = useAsync(
    FileService.getFile(encodedPath),
    {
      ok: ok => ok,
      err: err => err,
      key: encodedPath
    }
  )

  const accessToken = useSignal<string | undefined>(undefined)
  useEffect(() => {
    AuthService.postAccessToken({ path: encodedPath })
      .then(res => accessToken.value = res.accessToken)
  }, [])

  return (
    <div>
      {fileState.status == "error" && JSON.stringify(fileState.error)}
      {fileState.status == "loading" && "loading"}
      {fileState.status == "ok" && <>
        <div className="flex flex-row justify-between p-4 border-b-2 items-center">
          <h1 class="text-lg font-bold">{fileState.data?.name}</h1>
          <SmallPrimaryButton onClick={async () => {
            window.open(`${OpenAPI.BASE}/file/${encodedPath}/blob?accessToken=${accessToken.value}`)
          }}>
            Download
          </SmallPrimaryButton>
        </div>
        {accessToken.value && <Content path={encodedPath} file={fileState.data} accessToken={accessToken.value} />}
      </>}

    </div>
  )
}

const Content: FunctionComponent<{ path: string, file: File, accessToken: string }> = prop => {
  const type = prop.file.type
  const isText = type.startsWith("text/")
  const isImage = type.startsWith("image/")
  const isVideo = type.startsWith("video/")

  return (
    <div class="py-4 overflow-y-auto">
      {isText && <TextFile path={prop.path} accessToken={prop.accessToken} />}
      {isImage && <div >
        <img class="mx-auto" src={`${OpenAPI.BASE}/file/${prop.path}/blob?accessToken=${prop.accessToken}`} />
      </div>}
      {isVideo &&
        <div >
          <video class="mx-auto" src={`${OpenAPI.BASE}/file/${prop.path}/blob?accessToken=${prop.accessToken}`} controls />
        </div>
      }
    </div>
  )
}

const TextFile: FunctionComponent<{ path: string, accessToken: string }> = prop => {


  const text = useAsync(
    fetch(`${OpenAPI.BASE}/file/${prop.path}/blob?accessToken=${prop.accessToken}`),
    {
      ok: async ok => await ok.text(),
      err: err => err,
      key: prop.path
    }
  )

  return (
    <pre>
      {text.status === "ok" && text.data}
      {text.status === "error" && JSON.stringify(text.error, null, 2)}

    </pre>
  )
}