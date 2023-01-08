import { Popup } from "../components/popup/popup"
import { FunctionComponent } from "preact";

export const PastePopupSuccess: FunctionComponent = () => <Popup>Paste Success</Popup>
export const PastePopupError: FunctionComponent = () => <Popup>Paste Error</Popup>
export const PastePopupInProgress: FunctionComponent = () => <Popup>Pasting in Progress</Popup>