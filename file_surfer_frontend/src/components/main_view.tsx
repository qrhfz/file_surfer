export function MainView() {
  return (
    <div>
      <header class="flex flex-row">
        <ListHeaderItem name="Name" />
        <ListHeaderItem name="Size" />
        <ListHeaderItem name="Type" />
        <ListHeaderItem name="Modified" />
      </header>
    </div>
  )
}

function ListHeaderItem({ name }: { name: string }) {
  return (
    <div class="flex-grow p-2 bg-slate-100 hover:bg-slate-50 cursor-pointer">{name}</div>
  )
}