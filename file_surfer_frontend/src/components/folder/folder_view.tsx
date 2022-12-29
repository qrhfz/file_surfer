import "./folder_view.css";
import { useState, useEffect, useContext } from "preact/hooks";
import { BiFile, BiFolder } from "react-icons/bi";
import { formatBytes } from "../../utils/formatBytes";
import { formatDateString } from "../../utils/formatDateString";
import * as API from "../../generated-sources/openapi";
import { route } from "preact-router";
import { MarkedFilesContext, MarkedFilesState } from "../../file_marking";
import { ContextMenu, ContextMenuPosition } from "../context_menu";

type File = API.File

type Folder = API.Folder

type FileOrFolder = { tag: "file", item: File } | { tag: "folder", item: Folder }

export const FolderView: preact.FunctionalComponent<{ loc?: string }> = ({ loc }) => {
  const [widthList, setWidthList] = useState<number[]>([200, 200, 200, 200])
  const [items, setItems] = useState<FileOrFolder[]>([])
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])
  const [lastSelected, setLastSelected] = useState<number>()
  const [contextMenuPosition, setContextMenuPosition] = useState<ContextMenuPosition>()


  useEffect(() => {
    API.FolderService.getFolder(loc).then(body => {
      const files: FileOrFolder[] = (body.files ?? [])
        .map((f) => ({ tag: "file", item: f, }))
      const folders: FileOrFolder[] = (body.folders ?? [])
        .map((f) => ({ tag: "folder", item: f, }))
      setItems([...folders, ...files])
    })
  }, [loc])

  function widthListToTemplate(): string {
    const t = widthList.map(n => `max(${n}px, 10ch)`).join(" ")
    return t
  }

  function resizeHandler(i: number) {
    return function (d: number) {
      const l = [...widthList]
      l[i] += d
      setWidthList(l)
    }
  }

  const columns: string[] = [
    "Name", "Size", "Type", "Modified"
  ]

  const handleItemClick = (i: number) => (e: MouseEvent) => {
    setContextMenuPosition(undefined)
    if (e.type !== 'click') return
    if (e.shiftKey) {
      selectManyItems(i)
    } else {
      if (selectedIndices.length <= 1) {
        selectedIndices.includes(i) ? openItem(i) : selectSingleItem(i)
      } else {
        selectSingleItem(i)
      }

    }
  }

  const selectManyItems = (i: number) => {
    if (selectedIndices.length > 0) {
      const last = lastSelected ?? selectedIndices[selectedIndices.length - 1]
      let range: number[]

      if (last > i) {
        range = [...Array(last - i + 1).keys()].map(n => n + i)
      } else {
        range = [...Array(i - last + 1).keys()].map(n => n + last)
      }

      setSelectedIndices(range)
    } else {
      selectedIndices.includes(i) ? openItem(i) : selectSingleItem(i)
    }
  }

  const openItem = (i: number) => {
    if (items[i].tag == "folder") {
      const newLoc = '/browse/' + items[i].item.location + '/' + items[i].item.name
      route(newLoc)
    } else {
      const newLoc = '/view/' + items[i].item.location + '/' + items[i].item.name
      route(newLoc)
    }
  }

  const selectSingleItem = (i: number) => {

    setSelectedIndices([i])
    setLastSelected(i)
  }

  const handleRightClick = (i: number) => (e: MouseEvent) => {
    e.preventDefault()
    if (e.type !== 'contextmenu') return
    selectSingleItem(i)
    setContextMenuPosition({
      x: e.x,
      y: e.y
    })
  }

  useEffect(() => {
    window.onkeydown = handleKeyboardShortcut

    return () => {
      window.onkeydown = null
    }
  }, [items, selectedIndices]);

  const markedFiles = useContext(MarkedFilesContext)

  const handleKeyboardShortcut = (e: KeyboardEvent) => {

    if (!e.ctrlKey) {
      return
    }

    if (e.key == 'c') {
      const paths = selectedIndices.map(i => {
        return (items[i].item.location ?? '') + '/' + (items[i].item.name ?? '');
      })
      console.log(paths)
      markedFiles.setValue(paths)

    } else if (e.key == 'v') {
      console.log('paste')
    }
  }

  return (
    <>
      {contextMenuPosition && <ContextMenu position={contextMenuPosition} />}
      <table
        class="folder-list-view"
        style={{
          gridTemplateColumns: widthListToTemplate()
        }}
      >
        <thead>
          <tr>
            {columns.map(function (c, i) {
              return (
                <FolderListViewHeaderCell
                  key={c} name={c}
                  onResize={resizeHandler(i)}
                />);
            })}
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
                  {f.tag == "folder" && formatBytes(f.item.contentSize ?? 0)}
                </FolderListViewCell>

                <FolderListViewCell selected={selected}>
                  {f.tag == "file" && f.item.type}
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

function FolderListViewHeaderCell({ name, onResize = () => { } }: { name: string, onResize?: (d: number) => void }) {
  let lastPos = 0

  const mouseMoveHandler = (e: MouseEvent) => {
    const d = e.clientX - lastPos
    onResize(d)
    e.preventDefault()
  }

  return (
    <th class="
  bg-slate-100 hover:bg-slate-50
    flex flex-row items-stretch 
    ">
      <div class="cursor-pointer p-2 inline-block flex-grow">{name}</div>
      <span class="border-2 cursor-ew-resize w-1"
        onMouseDown={e => {
          e.preventDefault()

          lastPos = e.clientX

          window.onmousemove = mouseMoveHandler
          window.onmouseup = e => {
            e.preventDefault()
            lastPos = e.clientX
            window.onmousemove = null
            window.onmouseup = null
          }
        }}
      ></span>
    </th>
  )
}

const FolderListViewCell: preact.FunctionalComponent<{ selected: boolean }> = ({ selected, children }) => {

  return (
    <td class={selected ? "bg-slate-200" : undefined}>
      {children}
    </td>
  )
}