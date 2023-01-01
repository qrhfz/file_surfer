import { route, getCurrentUrl } from "preact-router";
import { useState } from "preact/hooks";
import { BiSearch } from "react-icons/bi";
import { SimpleInput } from "./input/simple_input";

export function Nav() {
  const [term, setTerm] = useState("")


  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const path = new URLSearchParams({ "q": term, "in": getCurrentUrl() })
    route("/search?" + path.toString(), false)
  }

  return (
    <nav class="bg-slate-200 flex flex-row p-4">
      <div class=" relative ">
        <div class=" relative ">
          <form onSubmit={handleSubmit}>
            <SimpleInput
              placeholder="Search"
              value={term}
              handleChange={s => setTerm(s)}
            />
          </form>

        </div>
      </div>
    </nav>
  )
}