import { signal } from "@preact/signals";
import { File, FolderService } from "../generated-sources/openapi";
import { SearchPage } from "./search_page";

export const createSearchState = () => {
  const files = signal<File[]>([]);
  const term = signal("");

  const search = async () => {
    files.value = await FolderService.getSearch(".", term.value);
  };

  return {
    files,
    term,
    search,
  };
};
