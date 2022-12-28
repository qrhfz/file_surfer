import { MainView } from './components/main_view'
import { Nav } from './components/nav'
import { Sidebar } from './components/sidebar'

export function App() {
  return (
    <div>
      <Nav />
      <div class="flex flex-row">

        <div class="w-64">
          <Sidebar />
        </div>
        <div class="overflow-x-auto">
          <MainView />
        </div>
      </div>
    </div>
  )
}
