import { route, getCurrentUrl } from "preact-router";
import { useState } from "preact/hooks";
import { BiSearch } from "react-icons/bi";


type Prop = { q?: string, at?: string }

export const Nav: preact.FunctionalComponent<Prop> = ({ q, at }) => {
  const [term, setTerm] = useState(q?.replaceAll("+", " ") ?? "")


  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const curr = getCurrentUrl().replace(/^\/browse/, "")
    const path = new URLSearchParams({ "q": term, "in": at ?? curr })
    route("/search?" + path.toString(), false)
  }

  return (
    <nav class="bg-slate-200 flex flex-row py-4">
      <div className="basis-2/12">
        <div className="w-64"></div>
      </div>
      <div className="px-4">
        <a href="/search">
          <div class="bg-white w-48 p-2 rounded-lg flex flex-row items-center">
            <BiSearch />
            <div className="basis-4"></div>
            <span class="text-slate-400">Search</span>
          </div>
        </a>
      </div>

    </nav>
  )
}