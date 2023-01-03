import { signal } from "@preact/signals";
import { Component, ComponentType, createContext, JSX } from "preact";

export class ModalState {
  component = signal<JSX.Element | undefined>(undefined);

  show(content: JSX.Element) {
    this.component.value = content;
  }

  close() {
    this.component.value = undefined;
  }
}

export const ModalContext = createContext(new ModalState());
