import { signal } from "@preact/signals";
import { Component, ComponentType, createContext, JSX } from "preact";

export class PopupState {
  content = signal<JSX.Element | undefined>(undefined);

  show(content: JSX.Element) {
    this.content.value = content;
    console.log("show popup");
  }

  close() {
    this.content.value = undefined;
  }
}

export const PopupContext = createContext(new PopupState());
