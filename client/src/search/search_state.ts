import { signal } from "@preact/signals";
import { File, FolderService } from "../generated-sources/openapi";
import { AsyncState } from "../utils/useAsync";

export const createSearchState = () => {
  const files = signal<AsyncState<File[], string>>({ status: "ok", data: [] });
  const term = signal("");

  const search = async () => {
    files.value = { status: "loading" };
    try {
      const res = await FolderService.getSearch(".", term.value);
      files.value = {
        status: "ok",
        data: res,
      };
    } catch (error) {
      files.value = {
        status: "error",
        error: JSON.stringify(error),
      };
    }
  };

  return {
    files,
    term,
    search,
  };
};
