import { useSignal } from "@preact/signals"
import { FunctionComponent } from "preact"
import { useEffect } from "preact/hooks"
import { SmallPrimaryButton } from "../components/buttons"
import { AuthService, File, FileService, OpenAPI } from "../generated-sources/openapi"
import { SingleColumnLayout } from "../layout/single_column_layout"
import { useAsync } from "../utils/useAsync"

type FilveViewPageType = FunctionComponent<{ loc?: string }>

export const FileViewPage: FilveViewPageType = prop => {
  const path = encodeURIComponent(prop.loc!)

  const fileState = useAsync(
    FileService.getFile(path),
    {
      ok: ok => ok,
      err: err => err,
      key: path
    }
  )

  const accessToken = useSignal<string | undefined>(undefined)
  useEffect(() => {
    AuthService.getAccessToken()
      .then(res => accessToken.value = res.accessToken)
  }, [])

  return (
    <SingleColumnLayout>
      {fileState.status == "error" && JSON.stringify(fileState.error)}
      {fileState.status == "loading" && "loading"}
      {fileState.status == "ok" && <>
        <div className="flex flex-row justify-between pb-4 border-b-2 items-center">
          <h1 class="text-lg font-bold">{fileState.data?.name}</h1>
          <SmallPrimaryButton onClick={async () => {
            window.open(`${OpenAPI.BASE}/file/${path}/blob?accessToken=${accessToken.value}`)
          }}>
            Download
          </SmallPrimaryButton>
        </div>
        {accessToken.value && <Content path={path} file={fileState.data} accessToken={accessToken.value} />}
      </>}
    </SingleColumnLayout>
  )
}

const Content: FunctionComponent<{ path: string, file: File, accessToken: string }> = prop => {
  const type = prop.file.type
  const isText = type.startsWith("text/")
  const isImage = type.startsWith("image/")
  const isVideo = type.startsWith("video/")

  return (
    <div class="py-4 h-[66vh] overflow-y-auto">
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