import { signal } from "@preact/signals";
import { Component, ComponentType, createContext } from "preact";

export class PopupState {
  component = signal<ComponentType | undefined>(undefined);

  show(content: ComponentType) {
    this.component.value = content;
    console.log("show popup");
  }

  close() {
    this.component.value = undefined;
  }
}

export const PopupContext = createContext(new PopupState());
