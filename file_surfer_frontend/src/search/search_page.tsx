import { FunctionComponent } from "preact"
import { useEffect, useRef } from "preact/hooks"
import { SmallPrimaryButton } from "../components/buttons"
import { LoadingCircle } from "../components/loading_circle"
import { formatBytes } from "../utils/formatBytes"
import { formatDateString } from "../utils/formatDateString"
import { joinPath, joinPaths } from "../utils/path"
import { createSearchState } from "./search_state"
const state = createSearchState()

export const SearchPage: FunctionComponent = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  return (
    <div class="mx-auto w-full md:w-8/12 lg:w-6/12">
      <div className="flex flex-row p-4 gap-4">
        <input
          type="text"
          class="simple-input"
          placeholder="search"
          value={state.term.value}
          onChange={v => {
            state.term.value = v.currentTarget.value
          }}
          ref={inputRef}
        />
        <SmallPrimaryButton onClick={state.search}>
          Search
        </SmallPrimaryButton>
      </div>


      <div class="grid grid-cols-5 p-4">
        <div>Name</div>
        <div>Location</div>
        <div>Type</div>
        <div>Size</div>
        <div>Modified</div>
        {state.files.value.status == "ok"
          && state.files.value.data.map(f => {
            return (
              <a
                href={joinPaths(f.isDir ? "/browse/" : "/view/", f.location, f.name)}
                class="contents"
                key={JSON.stringify(f)}
              >
                <div>{f.name}</div>
                <div class="whitespace-nowrap text-ellipsis overflow-hidden">{f.location}</div>
                <div>{f.type}</div>
                <div>{formatBytes(f.size)}</div>
                <div>{formatDateString(f.modified)}</div>
              </a>
            )
          })}

        {state.files.value.status == "loading" && <LoadingCircle />}
        {state.files.value.status == "error" &&
          <pre class="text-red-400">
            {state.files.value.error}
          </pre>
        }
      </div>
    </div>
  )
}