import { useContext, useEffect } from "preact/hooks";
import { ClipboardContext } from "../../clipboard";
import { PopupContext } from "../../signals/popup_state";
import { joinPaths } from "../../utils/path";
import { FileOrFolder } from "./model";
import { PastePopupError, PastePopupInProgress, PastePopupSuccess } from "./popups";

export const useClipboard = (
  loc: string | undefined,
  selectedIndices: number[],
  items: FileOrFolder[],
) => {
  const markedFiles = useContext(ClipboardContext);
  const popup = useContext(PopupContext);

  useEffect(() => {
    window.onkeydown = handleKeyboardShortcut;

    return () => {
      window.onkeydown = null;
    };
  }, [items, selectedIndices]);

  const copy = () => {
    if (loc === undefined) {
      return;
    }
    markedFiles.copy(selectedPaths());
  };
  const cut = () => {
    if (loc === undefined) {
      return;
    }
    markedFiles.cut(selectedPaths());
  };
  const paste = () => {
    if (loc === undefined) {
      return;
    }
    popup.show(<PastePopupInProgress />);

    markedFiles.paste(loc)
      .then((_) => popup.show(<PastePopupSuccess />))
      .catch((_) => popup.show(<PastePopupError />));
  };

  const handleKeyboardShortcut = (e: KeyboardEvent) => {
    if (!e.ctrlKey) {
      return;
    }

    if (e.key == "c") {
      copy();
    } else if (e.key == "x") {
      cut();
    } else if (e.key == "v") {
      paste();
    }
  };

  const selectedPaths = () => {
    return selectedIndices.map((i) => {
      return joinPaths(
        items[i].item.location ?? ".",
        items[i].item.name ?? ".",
      );
    });
  };

  return {
    copy,
    cut,
    paste,
  };
};