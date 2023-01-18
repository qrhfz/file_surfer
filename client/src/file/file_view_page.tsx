import { useSignal } from "@preact/signals"
import { FunctionComponent } from "preact"
import { FC } from "preact/compat"
import { useContext, useEffect } from "preact/hooks"
import { useGuard } from "../auth/useGuard"
import { SmallPrimaryButton } from "../components/buttons"
import { LoadingCircle } from "../components/loading_circle"
import { File, OpenAPI } from "../generated-sources/openapi"
import { FileViewContext } from "./file_view_state"

type FilveViewPageType = FunctionComponent<{ loc?: string }>

export const FileViewPage: FilveViewPageType = ({ loc }) => {
  useGuard()
  const fileView = useContext(FileViewContext)
  useEffect(() => {
    if (loc) {
      fileView.setPath(loc)
    }

    return () => fileView.reset()
  }, [loc])
  const info = fileView.info.value
  const encodedPath = fileView.encodedPath.value
  const accessToken = fileView.accessToken.value

  if (info.status === "error") {
    return <div>{info.error}</div>
  }

  if (encodedPath && info.status === "ok" && accessToken) {

    return (
      <div class="flex flex-col h-screen">
        <div className="flex flex-row justify-between p-4 border-b-2 items-center">
          <h1 class="text-lg font-bold">{info.data.name}</h1>
          <SmallPrimaryButton onClick={async () => {
            window.open(`${OpenAPI.BASE}/file/${encodedPath}/blob?accessToken=${accessToken}`)
          }}>
            Download
          </SmallPrimaryButton>
        </div>
        <Content path={encodedPath} file={info.data} accessToken={accessToken} />
      </div>
    )
  }
  return (
    <div class="grid h-screen items-center justify-center">
      <div>
        <LoadingCircle />
      </div>
    </div>
  )
}

type ContentProp = { path: string, file: File, accessToken: string }
const Content: FC<ContentProp> = ({ path, file, accessToken }) => {
  const type = file.type
  const isText = type.startsWith("text/")
  const isImage = type.startsWith("image/")
  const isVideo = type.startsWith("video/")

  return (
    <div class="flex-grow py-4 overflow-y-auto">
      {isText && <TextFile path={path} accessToken={accessToken} />}
      {isImage && <div >
        <img class="mx-auto" src={`${OpenAPI.BASE}/file/${path}/blob?accessToken=${accessToken}`} />
      </div>}
      {isVideo &&
        <div >
          <video class="mx-auto" src={`${OpenAPI.BASE}/file/${path}/blob?accessToken=${accessToken}`} controls />
        </div>
      }
    </div>
  )
}


type TextFileProp = { path: string, accessToken: string }
const TextFile: FC<TextFileProp> = ({ path, accessToken }) => {

  const content = useSignal("")

  useEffect(() => {
    fetch(`${OpenAPI.BASE}/file/${path}/blob?accessToken=${accessToken}`)
      .then(res => res.text())
      .then(t => content.value = t)
      .catch(e => content.value = JSON.stringify(e))
  }, [path,])
  return (
    <pre>
      {content}
    </pre>
  )
}