import { route } from "preact-router";
import { useState } from "preact/hooks";
import { FileOrFolder } from "./model";

export const useSelect = (
  items: FileOrFolder[],
  openContextMenu: (x: number, y: number) => void,
  closeContextMenu: () => void,
) => {
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [lastSelected, setLastSelected] = useState<number>();

  const handleItemClick = (i: number) =>
    (e: MouseEvent) => {
      closeContextMenu();
      if (e.type !== "click") return;
      if (e.shiftKey) {
        selectManyItems(i);
      } else {
        if (selectedIndices.length <= 1) {
          selectedIndices.includes(i) ? openItem(i) : selectSingleItem(i);
        } else {
          selectSingleItem(i);
        }
      }
    };

  const handleRightClick = (i: number) =>
    (e: MouseEvent) => {
      e.preventDefault();
      if (e.type !== "contextmenu") return;
      selectSingleItem(i);
      openContextMenu(e.x, e.y);
    };

  const selectManyItems = (i: number) => {
    if (selectedIndices.length > 0) {
      const last = lastSelected ?? selectedIndices[selectedIndices.length - 1];
      let range: number[];

      if (last > i) {
        range = [...Array(last - i + 1).keys()].map((n) => n + i);
      } else {
        range = [...Array(i - last + 1).keys()].map((n) => n + last);
      }

      setSelectedIndices(range);
    } else {
      selectedIndices.includes(i) ? openItem(i) : selectSingleItem(i);
    }
  };

  const openItem = (i: number) => {
    if (items[i].tag == "folder") {
      const newLoc = "/browse/" + items[i].item.location + "/" +
        items[i].item.name;
      route(newLoc);
    } else {
      const newLoc = "/view/" + items[i].item.location + "/" +
        items[i].item.name;
      route(newLoc);
    }
  };

  const selectSingleItem = (i: number) => {
    setSelectedIndices([i]);
    setLastSelected(i);
  };

  return { selectedIndices, handleItemClick, handleRightClick };
};
