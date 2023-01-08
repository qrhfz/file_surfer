import { BiSearch } from "react-icons/bi";
import { FunctionComponent } from "preact";


type Prop = { q?: string, at?: string }

export const Nav: FunctionComponent<Prop> = () => {


  return (
    <nav class="bg-slate-200 flex flex-row py-4">
      <div className="basis-2/12">
        <div className="w-64" />
      </div>
      <div className="px-4">
        <a href="/search">
          <div class="bg-white w-48 p-2 rounded-lg flex flex-row items-center">
            <BiSearch />
            <div className="basis-4" />
            <span class="text-slate-400">Search</span>
          </div>
        </a>
      </div>

    </nav>
  )
}