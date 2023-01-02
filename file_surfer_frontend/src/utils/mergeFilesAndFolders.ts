import { FileOrFolder } from "../components/folder/model";
import { File, Folder } from "../generated-sources/openapi";

export const mergeFilesAndFolders = (files: File[], folders: Folder[]) => {
  const _files: FileOrFolder[] = files.map((f) => ({ tag: "file", item: f }));
  const _folders: FileOrFolder[] = folders.map((f) => ({
    tag: "folder",
    item: f,
  }));
  return [..._folders, ..._files];
};
