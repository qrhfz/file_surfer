import { useState } from 'preact/hooks'
import { MainView } from './components/main_view'
import { Nav } from './components/nav'
import { Sidebar } from './components/sidebar'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="is-flex is-flex-direction-column" style={{ height: '100vh' }}>
      <Nav />
      <div className="columns is-flex-grow-1 is-align-items-stretch">
        <Sidebar />
        <MainView />
      </div>
    </div>
  )
}
