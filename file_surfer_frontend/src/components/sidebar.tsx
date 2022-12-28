import { BiFolder } from "react-icons/bi";

export function Sidebar() {
    return <div className="column is-narrow has-background-white-ter">
        <div className="p-4">
            <aside class="menu">
                <p class="menu-label">
                    Bookmarks
                </p>
                <ul class="menu-list">
                    <li><a><BiFolder /> Documents</a></li>
                    <li><a><BiFolder /> Pictures</a></li>
                </ul>
            </aside>
        </div>
    </div>
}