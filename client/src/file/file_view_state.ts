import { computed, effect, signal } from "@preact/signals";
import { createContext } from "preact";
import { AuthService, File, FileService } from "../generated-sources/openapi";
import { AsyncState } from "../utils/useAsync";

export const createFileViewState = () => {
  const path = signal<string | undefined>(undefined);
  const encodedPath = computed(() =>
    path.value ? encodeURIComponent(path.value) : undefined
  );
  const setPath = (p: string) => path.value = p;

  const _info = signal<AsyncState<File, string>>({ status: "loading" });
  const info = computed(() => _info.value);
  const _accessToken = signal<string | undefined>(undefined);
  const accessToken = computed(() => _accessToken.value);

  effect(async () => {
    if (encodedPath.value === undefined) {
      return;
    }
    try {
      const f = await FileService.getFile(encodedPath.value);
      _info.value = { status: "ok", data: f };
    } catch (error) {
      _info.value = { status: "error", error: JSON.stringify(error) };
    }
  });

  effect(async () => {
    if (encodedPath.value === undefined) {
      return;
    }
    try {
      const res = await AuthService.postAccessToken({
        path: encodedPath.value,
      });
      _accessToken.value = res.accessToken;
    } catch (error) {
    }
  });
  const reset = () => {
    path.value = undefined;
    _info.value = { status: "loading" };
    _accessToken.value = undefined;
  };
  return {
    info,
    accessToken,
    setPath,
    encodedPath,
    reset,
  };
};

export const FileViewContext = createContext(createFileViewState());
