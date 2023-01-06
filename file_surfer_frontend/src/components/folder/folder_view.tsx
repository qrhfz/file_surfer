import "./folder_view.css";
import { useState, useMemo, useContext } from "preact/hooks";
import { BiFile, BiFolder } from "react-icons/bi";
import { formatBytes } from "../../utils/formatBytes";
import { formatDateString } from "../../utils/formatDateString";
import { File, FileService, FolderService } from "../../generated-sources/openapi";
import { ContextMenu, ContextMenuPosition } from "./context_menu";
import { FolderListViewCell, FolderListViewHeaderCell } from "./cell";
import { useClipboard } from "./useClipboard";
import { useSelect } from "./useSelect";
import { createContext, FunctionComponent } from "preact";
import { memo } from "preact/compat";
import { computed, signal } from "@preact/signals";
import { joinPath } from "../../utils/path";
import { PopupContext } from "../../signals/popup_state";
import { Popup } from "../popup";

type FolderView = preact.FunctionalComponent<{ items: File[], loc?: string }>

export const createColumnResizer = (columns: string[] = ["Name", "Size", "Type", "Modified"]) => {

  const widths = signal(columns.map(_ => 200))

  const template = computed(() => widths.value.map((n) => `max(${n}px, 10ch)`).join(" "))

  const resize = (index: number, amount: number) => {
    const l = [...widths.value];
    l[index] += amount
    widths.value = l
  }

  return {
    widths, template, resize, columns
  }
}

export const ColumnResizerContext = createContext(createColumnResizer([]))

export const FolderView: FolderView = ({ loc, items }) => {
  const [contextMenuPosition, setContextMenuPosition] = useState<ContextMenuPosition>()

  const closeContextMenu = () => setContextMenuPosition(undefined)

  const resizer = useContext(ColumnResizerContext)
  const popup = useContext(PopupContext)

  const select = useSelect(
    items,
    (x, y) => { setContextMenuPosition({ x, y }) },
    () => setContextMenuPosition(undefined),
  )

  const { copy, cut, paste, } = useClipboard(loc, select.selectedIndices, items)

  const del = async () => {
    try {

      const paths = select.selectedIndices.map(i => {
        const item = items[i]
        return joinPath(item.name, item.location)
      })

      for (const p of paths) {
        await FileService.deleteFile(p)
      }
      popup.show(<Popup>Delete Success</Popup>)
    } catch (error) {
      popup.show(<Popup>Delete Error</Popup>)
    }

  }

  return (
    <>
      <table
        class="folder-list-view"
        style={{
          gridTemplateColumns: resizer.template.value
        }}
      >
        <FolderListViewHead columns={resizer.columns} />

        <FolderListViewBody
          items={items}
          selectedIndices={select.selectedIndices}
          handleItemClick={select.handleItemClick}
          handleRightClick={select.handleRightClick} />

      </table>
      {contextMenuPosition &&
        <ContextMenu
          position={contextMenuPosition}
          handleCopy={() => { copy(); closeContextMenu() }}
          handleCut={() => { cut(); closeContextMenu() }}
          handlePaste={() => { paste(); closeContextMenu() }}
          handleDownload={() => {
            // TODO: download link
            window.open("download");
            closeContextMenu();
          }}
          handleDelete={del} />}

    </>
  )
}

const FolderListViewHead: FunctionComponent<{
  columns: string[],
}> = memo(({ columns }) => {
  return <thead>
    <tr>
      {columns.map((c, i) => (
        <FolderListViewHeaderCell key={c} name={c} index={i} />)
      )}
    </tr>
  </thead>
})

const FolderListViewBody: FunctionComponent<{
  items: File[], selectedIndices: number[],
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
            key={f.location! + f.name}
            onClick={handleItemClick(i)}
            onContextMenu={handleRightClick(i)} />
        )
      })}
    </tbody>
  )
})

const FolderListRow: FunctionComponent<{
  entry: File,
  selected: boolean,
  onClick: (e: MouseEvent) => void,
  onContextMenu: (e: MouseEvent) => void,
}> = ({ entry, selected, onClick, onContextMenu }) => {

  const formattedDate = useMemo(() => formatDateString(entry.modified), [entry.modified])

  return (
    <tr
      key={entry.location! + entry.name}
      onClick={onClick}
      onContextMenu={onContextMenu}>

      <FolderListViewCell selected={selected}>
        <div class="w-4 h-4 inline-block align-middle mr-1">
          {entry.isDir ? <BiFolder /> : <BiFile />}
        </div>
        <span>{entry.name}</span>
      </FolderListViewCell>

      <FolderListViewCell selected={selected}>
        {entry.isDir ? `${entry.contentCount} items` : formatBytes(entry.size ?? 0)}
      </FolderListViewCell>

      <FolderListViewCell selected={selected}>
        {entry.isDir ? "Folder" : entry.type?.split(';')[0]}
      </FolderListViewCell>

      <FolderListViewCell selected={selected}>
        {formattedDate}
      </FolderListViewCell>
    </tr>
  )
}

