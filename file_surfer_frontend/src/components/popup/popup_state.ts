import { signal } from "@preact/signals";
import { createContext, JSX } from "preact";

export class PopupState {
  content = signal<JSX.Element | undefined>(undefined);

  show(content: JSX.Element) {
    this.content.value = content;
  }

  close() {
    this.content.value = undefined;
  }
}

export const PopupContext = createContext(new PopupState());
