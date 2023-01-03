import "./folder_view.css";
import { useState, useEffect } from "preact/hooks";
import { BiFile, BiFolder } from "react-icons/bi";
import { formatBytes } from "../../utils/formatBytes";
import { formatDateString } from "../../utils/formatDateString";
import { FolderService } from "../../generated-sources/openapi";
import { ContextMenu, ContextMenuPosition } from "../context_menu";
import { FolderListViewCell, FolderListViewHeaderCell } from "./cell";
import { useResize } from "./useResize";
import { FileOrFolder } from "./model";
import { useClipboard } from "./useClipboard";
import { useSelect } from "./useSelect";

type FolderView = preact.FunctionalComponent<{ items: FileOrFolder[], loc?: string }>

export const FolderView: FolderView = ({ loc, items }) => {
  const [contextMenuPosition, setContextMenuPosition] = useState<ContextMenuPosition>()
  const { columns, resizeHandler, gridColTemplate } = useResize(["Name", "Size", "Type", "Modified"])

  const {
    handleItemClick,
    handleRightClick,
    selectedIndices,
  } = useSelect(
    items,
    (x, y) => { setContextMenuPosition({ x, y }) },
    () => setContextMenuPosition(undefined),
  )

  const { copy, cut, paste, } = useClipboard(loc ?? '/', selectedIndices, items)

  return (
    <>
      {contextMenuPosition &&
        <ContextMenu
          handleCopy={() => { copy(); setContextMenuPosition(undefined) }}
          handleCut={() => { cut(); setContextMenuPosition(undefined) }}
          handlePaste={() => { paste(); setContextMenuPosition(undefined) }}
          handleDownload={() => {
            // TODO: download link
            window.open("download");
            setContextMenuPosition(undefined)
          }}
          position={contextMenuPosition} />}
      <table
        class="folder-list-view"
        style={{
          gridTemplateColumns: gridColTemplate
        }}
      >
        <thead>
          <tr>
            {columns.map((c, i) => (
              <FolderListViewHeaderCell
                key={c} name={c}
                onResize={resizeHandler(i)}
              />)
            )}
          </tr>
        </thead>
        <tbody>
          {items.map((f, i) => {
            const selected = selectedIndices.includes(i)

            return (
              <tr
                onClick={handleItemClick(i)}
                onContextMenu={handleRightClick(i)}>

                <FolderListViewCell selected={selected}>
                  <div class="w-4 h-4 inline-block align-middle mr-1">
                    {f.tag == "file" && <BiFile />}
                    {f.tag == "folder" && <BiFolder />}
                  </div>
                  <span>{f.item.name}</span>
                </FolderListViewCell>

                <FolderListViewCell selected={selected}>
                  {f.tag == "file" && formatBytes(f.item.size ?? 0)}
                  {f.tag == "folder" && `${f.item.contentCount} items`}
                </FolderListViewCell>

                <FolderListViewCell selected={selected}>
                  {f.tag == "file" && f.item.type?.split(';')[0]}
                  {f.tag == "folder" && "Folder"}
                </FolderListViewCell>

                <FolderListViewCell selected={selected}>
                  {f.item.modified != undefined ?
                    formatDateString(f.item.modified) : "N/A"}
                </FolderListViewCell>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

