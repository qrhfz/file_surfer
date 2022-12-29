import { render } from 'preact'
import { App } from './app'
import "./index.css";

import * as API from "./generated-sources/openapi";


API.OpenAPI.TOKEN = "aaaa"
API.OpenAPI.BASE = "http://127.0.0.1:3100"

render(<App />, document.getElementById('app') as HTMLElement)
