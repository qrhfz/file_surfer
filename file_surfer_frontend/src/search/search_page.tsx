import { FunctionComponent } from "preact"
import { SmallPrimaryButton } from "../components/buttons"
import { SimpleInput } from "../components/input/simple_input"
import { createSearchState } from "./search_state"
const state = createSearchState()

export const SearchPage: FunctionComponent = () => {
  return (
    <div>
      <div className="flex flex-row p-4">
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


      <ol>
        {state.files.value.map(f => {
          return (
            <li key={JSON.stringify(f)}>
              {f.name}
            </li>
          )
        })}
      </ol>
    </div>
  )
}