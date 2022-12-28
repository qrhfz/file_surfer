import { BiSearch } from "react-icons/bi";
import { SimpleInput } from "./input/simple_input";

export function Nav() {
  return (
    <nav class="bg-slate-200 flex flex-row p-4">
      <div class=" relative ">
        <div class=" relative ">
          <SimpleInput placeholder="Search" />
        </div>
      </div>
    </nav>
  )
}