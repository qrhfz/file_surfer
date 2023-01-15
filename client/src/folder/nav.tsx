import { BiSearch } from "react-icons/bi";
import { FunctionComponent } from "preact";
import { Breadcrumb } from "./breadcrumb";


type Prop = { q?: string, at?: string }

export const Nav: FunctionComponent<Prop> = () => {


  return (
    <nav class="bg-slate-200 flex flex-row py-4 items-center gap-8 justify-between px-8">
      <Breadcrumb />

      <a href="/search">
        <div class="bg-white w-48 p-2 rounded-lg flex flex-row items-center">
          <BiSearch />
          <div className="basis-4" />
          <span class="text-slate-400">Search</span>
        </div>
      </a>


    </nav>
  )
}