import "./folder_view.css";
import { useState, useMemo, useContext } from "preact/hooks";
import { BiFile, BiFolder } from "react-icons/bi";
import { createContext, FunctionComponent } from "preact";
import { memo } from "preact/compat";
import { computed, signal } from "@preact/signals";
import { ContextMenu, ContextMenuPosition } from "./context_menu";
import { PopupContext } from "../signals/popup_state";
import { File } from "./../generated-sources/openapi";

import { formatDateString } from "../utils/formatDateString";
import { formatBytes } from "../utils/formatBytes";
import { FolderContext } from "./folder_state";

type FolderView = preact.FunctionalComponent

export const FolderView: FolderView = () => {
  const [ctxMenuPos, setCtxMenuPos] = useState<ContextMenuPosition>()

  const closeContextMenu = () => setCtxMenuPos(undefined)

  const resizer = useContext(ColumnResizerContext)
  const popup = useContext(PopupContext)
  const folder = useContext(FolderContext)

  return (
    <div
      onContextMenu={e => {
        e.preventDefault()

        if (ctxMenuPos !== undefined) {
          closeContextMenu()
          return
        }

        const { x, y } = e
        setCtxMenuPos({ x, y })
      }}

      onClick={e => {
        closeContextMenu()
      }}>
      <table
        class="folder-list-view"
        style={{
          gridTemplateColumns: resizer.template.value
        }}
      >
        <FolderListViewHead columns={resizer.columns} />
        <FolderListViewBody />

      </table>
      {ctxMenuPos &&
        <ContextMenu
          position={ctxMenuPos}
          handleCopy={() => folder.copy()}
          handleCut={() => folder.cut()}
          handlePaste={() => folder.paste()}
          handleDownload={() => {
            // TODO: download link
            window.open("download");
            closeContextMenu();
          }}
          handleDelete={() => folder.delete()} />}
    </div>
  )
}

const FolderListViewHead: FunctionComponent<{
  columns: string[],
}> = memo(({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((c, i) => (
          <FolderListViewHeaderCell key={c} name={c} index={i} />)
        )}
      </tr>
    </thead>
  )
})

const FolderListViewBody: FunctionComponent = memo(() => {
  const folder = useContext(FolderContext)
  return (
    <tbody>
      {folder.files.value.map((f, i) => (
        <FolderListRow
          key={f.location! + f.name}
          index={i}
          entry={f}
          selected={folder.isSelected(f.name).value}
        />
      ))}
    </tbody>
  )
})

const FolderListRow: FunctionComponent<{
  index: number,
  entry: File,
  selected: boolean,
}> = ({ index, entry, selected }) => {
  const folder = useContext(FolderContext)
  const formattedDate = useMemo(() => formatDateString(entry.modified), [entry.modified])
  return (
    <tr
      onClick={e => {
        if (e.type !== "click") return;
        if (e.shiftKey) {
          folder.selectMultiFiles(index)
        } else {
          folder.selectSingleFile(index)
        }
      }}
      key={entry.location + entry.name}>

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

type CellType = preact.FunctionalComponent<{ selected: boolean }>

export const FolderListViewCell: CellType = ({ selected, children }) => {

  return (
    <td class={selected ? "bg-slate-200" : undefined}>
      {children}
    </td>
  )
}

export const FolderListViewHeaderCell: FunctionComponent<{ index: number, name: string }> = ({ index, name }) => {
  let lastPos = 0

  const resizer = useContext(ColumnResizerContext)

  const mouseMoveHandler = (e: MouseEvent) => {
    e.preventDefault()
    const distance = e.clientX - lastPos
    console.log('distance', distance)
    resizer.resize(index, distance)
    lastPos = e.clientX
  }

  return (
    <th class="
    flex flex-row items-stretch 
    ">
      <div class="cursor-pointer p-2 inline-block flex-grow">{name}</div>
      <span class="border-r-2 cursor-ew-resize w-1"
        onMouseDown={e => {
          e.preventDefault()

          lastPos = e.clientX

          window.onmousemove = mouseMoveHandler
          window.onmouseup = e => {
            e.preventDefault()
            window.onmousemove = null
            window.onmouseup = null
          }
        }}
      ></span>
    </th>
  )
}

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