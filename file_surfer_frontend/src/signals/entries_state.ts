import { signal } from "@preact/signals";
import { createContext } from "preact";
import { File } from "../generated-sources/openapi";

/**
 * store entries for folder browser page and search page. an entry is FileOrFolder
 */
export class EntriesState {
  entriesSignal = signal<File[]>([]);

  sourceFn: (() => Promise<File[]>) | undefined = undefined;

  async fetch() {
    const res = await this.sourceFn?.();

    if (res) {
      this.entriesSignal.value = res;
    }
  }
}

export const EntriesContext = createContext(new EntriesState());
