import "./main_view.css";
import { useState } from "preact/hooks";

export function MainView() {
  let [widthList, setWidthList] = useState<number[]>([200, 200, 200, 200])

  function widthListToTemplate(): string {
    const t = widthList.map(n => `${n}px`).join(" ")
    return t
  }

  return (
    <table
      style={{
        gridTemplateColumns: widthListToTemplate()
      }}
    >
      <thead>
        <tr>
          <ListHeaderItem name="Name" onResize={(d) => {
            const l = [...widthList]
            l[0] += d
            setWidthList(l)
          }} />
          <ListHeaderItem name="Size" />
          <ListHeaderItem name="Type" />
          <ListHeaderItem name="Modified" />
        </tr>
      </thead>
      <tbody>
        <tr>
          <ListBodyItem value="hello" />
          <ListBodyItem value="1kb" />
          <ListBodyItem value="text" />
          <ListBodyItem value="yesterday" />
        </tr>
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

          window.addEventListener('mousemove', mouseMoveHandler)
          window.addEventListener('mouseup', e => {
            lastPos = e.clientX
            window.removeEventListener('mousemove', mouseMoveHandler)
          })
        }}
      ></span>
    </th>
  )
}

function ListBodyItem({ value }: { value: string }) {
  return (
    <td class="px-2 py-1">{value}</td>
  )
}