import { computed, signal } from "@preact/signals";
import { createContext } from "preact";
import { FolderService, File, ClipboardService, FileService } from "../generated-sources/openapi";
import { joinPath } from "../utils/path";
import { AsyncState } from "../utils/useAsync";

export const FolderState = () => {
  const files = signal<File[]>([]);
  const loading = signal(false)
  const err = signal("")
  let folderPath = ""

  const showHidden = signal(false)
  const filesFiltered = computed(() => {
    if (showHidden.value) {
      return files.value
    }
    console.log(files.value)
    return files.value.filter(f => !f.name.startsWith("."));
  })

  const selectedPaths = signal<string[]>([]);
  const lastSelectedIndex = signal<number | undefined>(undefined)

  let clipboard: string[] = [];
  let mode: "copy" | "cut" | undefined;

  const fileOp = signal<AsyncState<boolean, string> | undefined>(undefined)

  const fetchFolder = async (path: string = folderPath) => {
    try {
      folderPath = path
      loading.value = true
      files.value = await FolderService.getFolder(path)
    } catch (error) {
      err.value = JSON.stringify(error)
    } finally {
      loading.value = false
    }
  }

  const refresh = async () => {
    await fetchFolder()
  }

  const copy = () => {
    clipboard = selectedPaths.value
    mode = "copy";
    selectedPaths.value = []
  }

  const cut = () => {
    clipboard = selectedPaths.value
    mode = "cut";
    selectedPaths.value = []
  }

  const paste = async () => {
    const sources = clipboard
    const input = { sources, destination: folderPath }

    try {
      if (mode == "copy") {
        await ClipboardService.postCopy(input);
      } else if (mode == "cut") {
        await ClipboardService.postMove(input);
      }
      fileOp.value = { status: "ok", data: true }
    } catch (error) {
      fileOp.value = { status: "error", error: "paste error" }
    } finally {
      mode = undefined;
      await refresh()
    }
  }

  const deleteFiles = async () => {
    fileOp.value = { status: "loading" }
    try {
      for (const path of selectedPaths.value) {
        await FileService.deleteFile(encodeURIComponent(path))
      }

      fileOp.value = { status: "ok", data: true };

    } catch (error) {
      fileOp.value = { status: "error", error: JSON.stringify(error) }
    } finally {
      selectedPaths.value = []
      await refresh()
    }
  }

  const selectSingleFile = (index: number) => {

    const file = files.value[index]
    const path = joinPath(file.location, file.name)
    selectedPaths.value = [path]
    lastSelectedIndex.value = index


  }

  const selectMultiFiles = (index: number) => {
    const last = lastSelectedIndex.value
    if (last === undefined) {
      selectSingleFile(index)
      return
    }

    const [start, end] = last > index ? [index, last] : [last, index]

    const _files = files.value.slice(start, end + 1)
    const paths = _files.map(f => joinPath(f.location, f.name))
    selectedPaths.value = paths
    lastSelectedIndex.value = index


  }

  const isSelected = (fileName: string) => {
    return computed(() => {
      const path = joinPath(folderPath, fileName)
      return selectedPaths.value.includes(path);
    })
  }

  return {
    fetchFolder,
    mode,
    filesFiltered,
    copy,
    cut,
    paste,
    refresh,
    deleteFiles,
    selectMultiFiles,
    selectSingleFile,
    isSelected,
    fileOp,
    loading,
    err
  }
}

export const FolderContext = createContext(FolderState())