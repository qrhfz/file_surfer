import { useState } from 'preact/hooks'
import { Nav } from './nav'
import { Sidebar } from './sidebar'

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div class="is-flex is-flex-direction-column" style={{ height: '100vh' }}>
      <Nav />
      <div className="columns is-flex-grow-1 is-align-items-stretch">
        <Sidebar />
        <div className="column">
          Main Content
        </div>
      </div>
    </div>
  )
}
