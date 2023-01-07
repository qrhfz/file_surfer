import { FunctionComponent } from "preact"
import { SmallPrimaryButton } from "../components/buttons"
import { SimpleInput } from "../components/input/simple_input"
import { formatBytes } from "../utils/formatBytes"
import { formatDateString } from "../utils/formatDateString"
import { createSearchState } from "./search_state"
const state = createSearchState()

export const SearchPage: FunctionComponent = () => {
  return (
    <div>
      <div className="flex flex-row p-4 gap-4">
        <SimpleInput
          placeholder="search"
          value={state.term.value}
          handleChange={v => {
            state.term.value = v
          }}
        />
        <SmallPrimaryButton onClick={state.search}>
          Search
        </SmallPrimaryButton>
      </div>


      <div class="grid grid-cols-4">
        <div>Name</div>
        <div>Location</div>
        <div>Size</div>
        <div>Modified</div>
        {state.files.value.map(f => {
          return (
            <div key={JSON.stringify(f)} class="contents">
              <div>{f.name}</div>
              <div class="whitespace-nowrap text-ellipsis overflow-hidden">{f.location}</div>
              <div>{formatBytes(f.size)}</div>
              <div>{formatDateString(f.modified)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}