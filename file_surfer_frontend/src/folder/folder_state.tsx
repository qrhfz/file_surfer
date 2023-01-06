import { signal } from "@preact/signals";
import { createContext } from "preact";
import { FolderService, File } from "../generated-sources/openapi";

export class FolderState {
  files = signal<File[]>([]);
  loading = signal(false)
  err = signal("")
  path = ""

  async fetchFolder(path: string) {
    try {
      this.path = path
      this.loading.value = true
      this.files.value = await FolderService.getFolder1(path)
    } catch (error) {
      this.err.value = JSON.stringify(error)
    } finally {
      this.loading.value = false
    }
  }

  async refresh() {
    try {
      this.loading.value = true
      this.files.value = await FolderService.getFolder1(this.path)
    } catch (error) {
      this.err.value = JSON.stringify(error)
    } finally {
      this.loading.value = false
    }
  }
}

export const FolderContext = createContext(new FolderState())