import { render } from 'preact'
import { App } from './app'
import { OpenAPI } from './generated-sources/openapi';
import "./index.css";

OpenAPI.BASE = "http://127.0.0.1:3100"
render(<App />, document.getElementById('app') as HTMLElement)
