import { signal } from "@preact/signals";
import { createContext } from "preact";

export class MarkedFilesState {
  readonly items = signal<string[]>([]);

  setValue(items: string[]) {
    this.items.value = items;
  }

  add(item: string) {
    this.items.value = [item];
  }

  remove(item: string) {
    const i = this.items.value.indexOf(item);
    const t = [...this.items.value];
    t.splice(i, 1);

    this.items.value = t;
  }
}
export const MarkedFilesContext = createContext(new MarkedFilesState());
