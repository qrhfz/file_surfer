import { MainView } from './components/main_view'
import { Nav } from './components/nav'
import { Sidebar } from './components/sidebar'

export function App() {
  return (
    <div>
      <Nav />
      <div class="flex flex-row">

        <div class="basis-64">
          <Sidebar />
        </div>
        <div class="flex-grow">
          <MainView />
        </div>
      </div>
    </div>
  )
}
