import { File, Folder, FolderService } from "../../generated-sources/openapi";

export type FileOrFolder =
  | { tag: "file"; item: File }
  | { tag: "folder"; item: Folder };
