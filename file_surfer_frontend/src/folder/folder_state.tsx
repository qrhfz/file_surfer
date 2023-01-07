import { computed, signal } from "@preact/signals";
import { createContext } from "preact";
import { FolderService, File, ClipboardService, FileService } from "../generated-sources/openapi";
import { joinPath } from "../utils/path";

export class FolderState {
  files = signal<File[]>([]);
  loading = signal(false)
  err = signal("")
  folderPath = ""

  selectedPaths = signal<string[]>([]);
  lastSelectedIndex = signal<number | undefined>(undefined)

  #mode: "copy" | "cut" | undefined;

  async fetchFolder(path: string = this.folderPath) {
    try {
      this.folderPath = path
      this.loading.value = true
      this.files.value = await FolderService.getFolder1(path)
    } catch (error) {
      this.err.value = JSON.stringify(error)
    } finally {
      this.loading.value = false
    }
  }

  async refresh() {
    await this.fetchFolder()
  }

  copy(items: string[]) {
    console.log("copy");
    this.#mode = "copy";
    this.selectedPaths.value = items;
  }

  cut(items: string[]) {
    console.log("cut");
    this.#mode = "cut";
    this.selectedPaths.value = items;
  }

  selectSingleFile(index: number) {
    console.log("select single")
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

  async paste(destination: string) {
    console.log("paste");

    const sources = this.selectedPaths.value
    const input = { sources, destination }

    if (this.#mode == "copy") {
      await ClipboardService.postCopy(input);
    } else if (this.#mode == "cut") {
      await ClipboardService.postMove(input);
    }

    this.#mode = undefined;
  }

  async delete() {
    for (const path of this.selectedPaths.value) {
      await FileService.deleteFile(path)
    }

    this.selectedPaths.value = []
  }
}

export const FolderContext = createContext(new FolderState())