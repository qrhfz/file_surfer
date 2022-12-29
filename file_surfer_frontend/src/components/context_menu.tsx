export type ContextMenuPosition = { x: number, y: number }

export const ContextMenu: preact.FunctionComponent<{ position: ContextMenuPosition }> = ({ position }) => {
  return (
    <nav
      aria-label="Context Menu"
      style={{ left: position.x, top: position.y }}
      class="fixed w-24 flex flex-col space-y-1 bg-white">
      <ContextMenuItem>
        Copy
      </ContextMenuItem>

      <ContextMenuItem>
        Cut
      </ContextMenuItem>
      <ContextMenuItem>
        Paste
      </ContextMenuItem>
    </nav>
  )
}

const ContextMenuItem: preact.FunctionComponent = ({ children }) => {
  return (
    <div
      class="block px-4 py-2 text-sm font-medium 
      text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
    >
      {children}
    </div>
  )
}
