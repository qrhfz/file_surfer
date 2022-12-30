import { signal } from "@preact/signals";
import { Component, ComponentType, createContext } from "preact";

export class PopupState {
  content = signal<ComponentType | undefined>(undefined);

  show(content: ComponentType) {
    this.content.value = content;
    console.log("show popup");
  }

  close() {
    this.content.value = undefined;
  }
}

export const PopupContext = createContext(new PopupState());
