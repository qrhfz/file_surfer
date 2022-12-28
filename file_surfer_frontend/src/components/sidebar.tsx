import { BiFolder } from "react-icons/bi";

export function Sidebar() {
  return (<div>
    <aside class="menu">
      <p class="menu-label">
        Bookmarks
      </p>
      <ul class="menu-list">
        <li><a><BiFolder /> Documents</a></li>
        <li><a><BiFolder /> Pictures</a></li>
      </ul>
    </aside>
  </div>)
}