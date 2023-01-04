export type ContextMenuPosition = { x: number, y: number }

type ContextMenuProp = {
  handleCopy: () => void,
  handleCut: () => void,
  handlePaste: () => void,
  handleDownload: () => void,
  position: ContextMenuPosition
}

export const ContextMenu: preact.FunctionComponent<ContextMenuProp> = (prop) => {
  const { position, handleCopy, handleCut, handlePaste, handleDownload } = prop

  return (
    <nav
      aria-label="Context Menu"
      style={{ left: position.x, top: position.y }}
      class="fixed w-24 flex flex-col space-y-1 bg-white">
      <ContextMenuItem onClick={handleCopy}>
        Copy
      </ContextMenuItem>

      <ContextMenuItem onClick={handleCut}>
        Cut
      </ContextMenuItem>

      <ContextMenuItem onClick={handlePaste}>
        Paste
      </ContextMenuItem>

      <ContextMenuItem onClick={handleDownload}>
        Download
      </ContextMenuItem>
    </nav>
  )
}

const ContextMenuItem: preact.FunctionComponent<{ onClick: () => void }> = ({ onClick, children }) => {
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
