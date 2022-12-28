import { MainView } from './components/main_view'
import { Nav } from './components/nav'
import { Sidebar } from './components/sidebar'

export function App() {
  return (
    <div>
      <Nav />
      <div>
        <Sidebar />
        <MainView />
      </div>
    </div>
  )
}
