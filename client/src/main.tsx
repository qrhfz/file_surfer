import { render } from 'preact'
import { App } from './app'
import { OpenAPI } from './generated-sources/openapi';
import "./index.css";
import { isProd } from "../config";

OpenAPI.BASE = isProd ? "/api" : "http://localhost:3000/api"
render(<App />, document.getElementById('app') as HTMLElement)
