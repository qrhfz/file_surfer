import { render } from 'preact'
import { App } from './app'
import { OpenAPI } from './generated-sources/openapi';
import "./index.css";

OpenAPI.BASE = "http://localhost:3000"
render(<App />, document.getElementById('app') as HTMLElement)
