import { render } from 'preact'
import { App } from './app'
import "./app.scss";

render(<App />, document.getElementById('app') as HTMLElement)
