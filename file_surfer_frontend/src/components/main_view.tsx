import "./main_view.css";
import { useState, useEffect } from "preact/hooks";
import { BiFile, BiFolder } from "react-icons/bi";
import { JSX } from "preact/jsx-runtime";

type File = {
  name: string,
  type: string,
  location: string,
  size: number,
  created: string,
  modified: string
}

type Folder = {
  name: string,
  contentCount: number,
  contentSize: number,
  location: string,
  modified: string,
  created: string,
  freeSpace: number
}

type FileOrFolder = { tag: "file", item: File } | { tag: "folder", item: Folder }

export function MainView() {
  const [widthList, setWidthList] = useState<number[]>([200, 200, 200, 200])
  const [items, setItems] = useState<FileOrFolder[]>([])
  const [selectedIndices, setSelectedIndices] = useState<number[]>([])


  useEffect(() => {
    fetch('http://127.0.0.1:3100/folder?path=Documents', {
      method: "GET",
      headers: {
        "Authorization": "Bearer abcdef"
      }
    }).then(res => {
      res.json().then(body => {
        console.log(body)
        const files: FileOrFolder[] = (body.files as Array<File>)
          .map((f) => ({ tag: "file", item: f, }))
        const folders: FileOrFolder[] = (body.folders as Array<Folder>)
          .map((f) => ({ tag: "folder", item: f, }))
        setItems([...folders, ...files])
      })
    })
  }, [])

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

  const selectSingleItem = (selected: boolean, i: number) => {
    setSelectedIndices([i])
  }

  return (
    <table
      style={{
        gridTemplateColumns: widthListToTemplate()
      }}
    >
      <thead>
        <tr>
          {columns.map(function (c, i) {
            return (
              <ListHeaderItem
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
            <tr onClick={_ => selectSingleItem(selected, i)}>
              <ListBodyItem selected={selected}>
                <div class="flex flex-row items-center gap-1">
                  <div class="w-4 h-4">
                    {f.tag == "file" && <BiFile />}
                    {f.tag == "folder" && <BiFolder />}
                  </div>
                  {f.item.name}
                </div>
              </ListBodyItem>
              {f.tag == "file" && <ListBodyItem selected={selected}>{`${f.item.size}`}</ListBodyItem>}
              {f.tag == "folder" && <ListBodyItem selected={selected}>{`${f.item.contentSize}`}</ListBodyItem>}

              {f.tag == "file" && <ListBodyItem selected={selected}>{f.item.type}</ListBodyItem>}
              {f.tag == "folder" && <ListBodyItem selected={selected}>Folder</ListBodyItem>}

              <ListBodyItem selected={selected}>{f.item.modified}</ListBodyItem>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

function ListHeaderItem({ name, onResize = () => { } }: { name: string, onResize?: (d: number) => void }) {
  let lastPos = 0

  const mouseMoveHandler = (e: MouseEvent) => {
    const d = e.clientX - lastPos
    onResize(d)
    console.log(e.clientX, lastPos)
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

const ListBodyItem: preact.FunctionalComponent<{ selected: boolean }> = ({ selected, children }) => {

  let myClass = "px-2 py-1 bg-white overflow-hidden whitespace-nowrap text-ellipsis cursor-default"

  if (selected) {
    myClass += " bg-slate-200"
  }

  return (
    <td class={myClass}>
      {children}
    </td>
  )
}