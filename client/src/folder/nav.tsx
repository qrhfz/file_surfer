import { BiSearch } from "react-icons/bi";
import { Breadcrumb } from "./breadcrumb";
import { FC } from "preact/compat";


type Prop = { q?: string, at?: string }

export const Nav: FC<Prop> = () => {
  return (
    <nav class="layout-i-head bg-slate-200 flex flex-row items-center gap-8 justify-between px-4">
      <div class="over">
        <Breadcrumb />
      </div>
      <a href="/search">
        <div class="bg-white md:w-48 p-2 rounded-lg flex flex-row items-center">
          <BiSearch size="16px" />
          <span class="text-slate-400 ml-4 hidden md:block">Search</span>
        </div>
      </a>
    </nav>
  )
}