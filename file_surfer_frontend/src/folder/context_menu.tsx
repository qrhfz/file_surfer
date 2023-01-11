import { FunctionComponent } from "preact";

export type ContextMenuPosition = { x: number, y: number }

type ContextMenuProp = {
  handleCopy: () => void,
  handleCut: () => void,
  handlePaste: () => void,
  handleDownload: () => void,
  handleDelete: () => void,
  handleRename: () => void,
  position: ContextMenuPosition
}

export const ContextMenu: FunctionComponent<ContextMenuProp> = (prop) => {
  const { position } = prop

  return (
    <nav
      aria-label="Context Menu"
      style={{ left: position.x, top: position.y }}
      class="fixed w-24 flex flex-col space-y-1 bg-white">
      <ContextMenuItem onClick={prop.handleCopy}>
        Copy
      </ContextMenuItem>

      <ContextMenuItem onClick={prop.handleCut}>
        Cut
      </ContextMenuItem>

      <ContextMenuItem onClick={prop.handlePaste}>
        Paste
      </ContextMenuItem>

      <ContextMenuItem onClick={prop.handleDownload}>
        Download
      </ContextMenuItem>
      <ContextMenuItem onClick={() => { }}>
        Rename
      </ContextMenuItem>
      <ContextMenuItem onClick={prop.handleDelete}>
        <span className="text-red-400">
          Delete
        </span>
      </ContextMenuItem>
    </nav>
  )
}

const ContextMenuItem: FunctionComponent<{ onClick: () => void }> = ({ onClick, children }) => {
  return (
    <div
      class="block px-4 py-2 text-sm font-medium 
      text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  )
}
