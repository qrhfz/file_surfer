import { batch, computed, signal } from "@preact/signals";
import { createContext } from "preact";
import { FolderService, File, ClipboardService, FileService, OpenAPI, AuthService } from "../generated-sources/openapi";
import { joinPath, joinPaths } from "../utils/path";
import { AsyncState } from "../utils/useAsync";

export const FolderState = () => {
  const folderPath = signal("")
  const files = signal<AsyncState<File[], string>>({ status: "loading" });

  const showHidden = signal(false)
  const filesFiltered = computed<File[]>(() => {
    if (files.value.status !== "ok") {
      return []
    }

    if (showHidden.value) {
      return files.value.data
    }

    return files.value.data.filter(f => !f.name.startsWith("."));
  })

  const selectedPaths = signal<string[]>([]);
  const lastSelectedIndex = signal<number | undefined>(undefined)
  const isOneSelected = computed(() => selectedPaths.value.length === 1)
  const isMultiSelected = computed(() => selectedPaths.value.length >= 1)

  const clipboard = signal<string[]>([]);
  let mode: "copy" | "cut" | undefined;
  const isPastable = computed(() => clipboard.value.length > 0)

  const fileOp = signal<AsyncState<boolean, string> | undefined>(undefined)

  const fetchFolder = async (path: string = folderPath.value) => {
    folderPath.value = path
    files.value = { status: "loading" }

    try {
      const res = await FolderService.getFolder(path)
      files.value = { status: "ok", data: res }
    } catch (e) {
      const error = JSON.stringify(e)
      files.value = { status: "error", error }
    }
  }

  const refresh = async () => {
    await fetchFolder()
  }

  const copy = () => {
    batch(() => {
      clipboard.value = selectedPaths.value
      mode = "copy";
      selectedPaths.value = []
    })

  }

  const cut = () => {
    batch(() => {
      clipboard.value = selectedPaths.value
      mode = "cut";
      selectedPaths.value = []
    })

  }

  const paste = async () => {
    const sources = clipboard.value
    batch(() => {
      selectedPaths.value = []
      clipboard.value = []
    })
    const input = { sources, destination: folderPath.value }
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

  const rename = async (newName: string) => {
    if (selectedPaths.value.length !== 1) {
      return
    }

    const path = selectedPaths.value[0]

    try {
      await FileService.patchFile(path, { name: newName })
    } catch (error) {

    } finally {
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

  const getDownloadUrl = async () => {
    const { accessToken } = await AuthService.getAccessToken()
    if (selectedPaths.value.length === 1) {
      const path = selectedPaths.value[0]
      return OpenAPI.BASE + joinPaths('/file', encodeURIComponent(path), `blob?accessToken=${accessToken}`)
    }
  }

  const selectSingleFile = (index: number) => {
    const file = filesFiltered.value[index]
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

    const files = filesFiltered.value.slice(start, end + 1)
    const paths = files.map(f => joinPath(f.location, f.name))
    selectedPaths.value = paths
    lastSelectedIndex.value = index


  }

  const isSelected = (fileName: string) => {
    return computed(() => {
      const path = joinPath(folderPath.value, fileName)
      return selectedPaths.value.includes(path);
    })
  }

  return {
    files,
    folderPath,
    fetchFolder,
    mode,
    filesFiltered,
    showHidden,
    copy,
    cut,
    paste,
    refresh,
    deleteFiles,
    selectMultiFiles,
    selectSingleFile,
    isSelected,
    fileOp,
    isOneSelected,
    isMultiSelected,
    isPastable,
    getDownloadUrl,
    rename
  }
}

export const FolderContext = createContext(FolderState())