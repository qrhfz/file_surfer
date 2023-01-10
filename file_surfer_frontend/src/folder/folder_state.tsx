import { computed, signal } from "@preact/signals";
import { createContext } from "preact";
import { FolderService, File, ClipboardService, FileService } from "../generated-sources/openapi";
import { joinPath } from "../utils/path";
import { AsyncState } from "../utils/useAsync";

export class FolderState {
  files = signal<File[]>([]);
  loading = signal(false)
  err = signal("")
  folderPath = ""

  selectedPaths = signal<string[]>([]);
  lastSelectedIndex = signal<number | undefined>(undefined)

  clipboard: string[] = [];
  #mode: "copy" | "cut" | undefined;

  fileOp = signal<AsyncState<boolean, string> | undefined>(undefined)

  async fetchFolder(path: string = this.folderPath) {
    try {
      this.folderPath = path
      this.loading.value = true
      this.files.value = await FolderService.getFolder(path)
    } catch (error) {
      this.err.value = JSON.stringify(error)
    } finally {
      this.loading.value = false
    }
  }

  async refresh() {
    await this.fetchFolder()
  }

  copy() {
    this.clipboard = this.selectedPaths.value
    this.#mode = "copy";
    this.selectedPaths.value = []
  }

  cut() {
    this.clipboard = this.selectedPaths.value
    this.#mode = "cut";
    this.selectedPaths.value = []
  }

  async paste() {
    const sources = this.clipboard
    const input = { sources, destination: this.folderPath }

    try {
      if (this.#mode == "copy") {
        await ClipboardService.postCopy(input);
      } else if (this.#mode == "cut") {
        await ClipboardService.postMove(input);
      }
      this.fileOp.value = { status: "ok", data: true }
    } catch (error) {
      this.fileOp.value = { status: "error", error: "paste error" }
    } finally {
      this.#mode = undefined;
      await this.refresh()
    }
  }

  async delete() {
    this.fileOp.value = { status: "loading" }
    try {
      for (const path of this.selectedPaths.value) {
        await FileService.deleteFile(encodeURIComponent(path))
      }

      this.fileOp.value = { status: "ok", data: true };

    } catch (error) {
      this.fileOp.value = { status: "error", error: JSON.stringify(error) }
    } finally {
      this.selectedPaths.value = []
      await this.refresh()
    }
  }

  selectSingleFile(index: number) {

    const file = this.files.value[index]
    const path = joinPath(file.location, file.name)
    this.selectedPaths.value = [path]
    this.lastSelectedIndex.value = index


  }

  selectMultiFiles(index: number) {
    const last = this.lastSelectedIndex.value
    if (last === undefined) {
      this.selectSingleFile(index)
      return
    }

    const [start, end] = last > index ? [index, last] : [last, index]

    const files = this.files.value.slice(start, end + 1)
    const paths = files.map(f => joinPath(f.location, f.name))
    this.selectedPaths.value = paths
    this.lastSelectedIndex.value = index


  }

  isSelected(fileName: string) {
    return computed(() => {
      const path = joinPath(this.folderPath, fileName)
      return this.selectedPaths.value.includes(path);
    })
  }
}

export const FolderContext = createContext(new FolderState())