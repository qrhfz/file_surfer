import { batch, computed, signal } from "@preact/signals";
import { createContext } from "preact";
import { FolderService, File, ClipboardService, FileService, OpenAPI, AuthService } from "../generated-sources/openapi";
import { joinPath, joinPaths } from "../utils/path";
import { AsyncState } from "../utils/useAsync";

export const FolderState = () => {
  const folderPath = signal("")

  const files = signal<File[]>([]);
  const loading = signal(false)
  const err = signal("")

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
  const isOneSelected = computed(() => selectedPaths.value.length === 1)
  const isMultiSelected = computed(() => selectedPaths.value.length >= 1)

  const clipboard = signal<string[]>([]);
  let mode: "copy" | "cut" | undefined;
  const isPastable = computed(() => clipboard.value.length > 0)

  const fileOp = signal<AsyncState<boolean, string> | undefined>(undefined)

  const fetchFolder = async (path: string = folderPath.value) => {
    try {
      folderPath.value = path
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
      const path = joinPath(folderPath.value, fileName)
      return selectedPaths.value.includes(path);
    })
  }

  return {
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
    loading,
    err,
    isOneSelected,
    isMultiSelected,
    isPastable,
    getDownloadUrl
  }
}

export const FolderContext = createContext(FolderState())