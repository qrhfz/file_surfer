import { FunctionComponent } from "preact"
import { useContext } from "preact/hooks"
import { ColumnResizerContext } from "./folder_view"

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