import "./folder_view.css";
import { useState, useEffect, useMemo } from "preact/hooks";
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
import { FunctionComponent } from "preact";
import { memo } from "preact/compat";

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

  const { copy, cut, paste, } = useClipboard(loc, selectedIndices, items)

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

        <FolderListViewHead
          columns={columns}
          resizeHandler={resizeHandler} />

        <FolderListViewBody
          items={items}
          selectedIndices={selectedIndices}
          handleItemClick={handleItemClick}
          handleRightClick={handleRightClick} />

      </table>
    </>
  )
}

const FolderListViewHead: FunctionComponent<{
  columns: string[], resizeHandler: (i: number) => (d: number) => void
}> = memo(({ columns, resizeHandler }) => {
  return <thead>
    <tr>
      {columns.map((c, i) => (
        <FolderListViewHeaderCell
          key={c} name={c}
          onResize={resizeHandler(i)}
        />)
      )}
    </tr>
  </thead>
})

const FolderListViewBody: FunctionComponent<{
  items: FileOrFolder[], selectedIndices: number[],
  handleItemClick: (i: number) => (e: MouseEvent) => void,
  handleRightClick: (i: number) => (e: MouseEvent) => void
}> = memo(({ items, selectedIndices, handleItemClick, handleRightClick }) => {
  return (
    <tbody>
      {items.map((f, i) => {
        const selected = selectedIndices.includes(i)
        return (
          <FolderListRow
            entry={f}
            selected={selected}
            key={f.item.location! + f.item.name}
            onClick={handleItemClick(i)}
            onContextMenu={handleRightClick(i)} />
        )
      })}
    </tbody>
  )
})

const FolderListRow: FunctionComponent<{
  entry: FileOrFolder,
  selected: boolean,
  onClick: (e: MouseEvent) => void,
  onContextMenu: (e: MouseEvent) => void,
}> = ({ entry, selected, onClick, onContextMenu }) => {

  const formattedDate = useMemo(() => formatDateString(entry.item.modified), [entry.item.modified])

  return (
    <tr
      key={entry.item.location! + entry.item.name}
      onClick={onClick}
      onContextMenu={onContextMenu}>

      <FolderListViewCell selected={selected}>
        <div class="w-4 h-4 inline-block align-middle mr-1">
          {entry.tag == "file" && <BiFile />}
          {entry.tag == "folder" && <BiFolder />}
        </div>
        <span>{entry.item.name}</span>
      </FolderListViewCell>

      <FolderListViewCell selected={selected}>
        {entry.tag == "file" && formatBytes(entry.item.size ?? 0)}
        {entry.tag == "folder" && `${entry.item.contentCount} items`}
      </FolderListViewCell>

      <FolderListViewCell selected={selected}>
        {entry.tag == "file" && entry.item.type?.split(';')[0]}
        {entry.tag == "folder" && "Folder"}
      </FolderListViewCell>

      <FolderListViewCell selected={selected}>
        {formattedDate}
      </FolderListViewCell>
    </tr>
  )
}

