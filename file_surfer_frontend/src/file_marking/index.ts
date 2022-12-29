import { signal } from "@preact/signals";
import { createContext } from "preact";
import { CopyService, MoveService } from "../generated-sources/openapi";

export class MarkedFilesState {
  #items: string[] = [];
  #mode: "copy" | "cut" | undefined;

  copy(items: string[]) {
    console.log("copy");
    this.#mode = "copy";
    this.#items = items;
  }

  cut(items: string[]) {
    console.log("cut");
    this.#mode = "cut";
    this.#items = items;
  }

  paste(destination: string) {
    console.log("paste");
    if (this.#mode == "copy") {
      CopyService.postCopy({
        sources: this.#items,
        destination,
      });
    } else if (this.#mode == "cut") {
      MoveService.postMove({
        sources: this.#items,
        destination,
      });
    }

    this.#mode = undefined;
  }

  add(item: string) {
    this.#items = [item];
  }

  remove(item: string) {
    const i = this.#items.indexOf(item);
    this.#items.splice(i, 1);
  }
}
export const MarkedFilesContext = createContext(new MarkedFilesState());
