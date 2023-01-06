import { useState } from "preact/hooks";

export const useResize = (columns: string[]) => {
  const [widthList, setWidthList] = useState<number[]>(
    Array.from({ length: columns.length }, (_, i) => 200),
  );

  function widthListToTemplate(): string {
    const t = widthList.map((n) => `max(${n}px, 10ch)`).join(" ");
    return t;
  }

  function resizeHandler(i: number) {
    return function (d: number) {
      const l = [...widthList];
      l[i] += d;
      setWidthList(l);
    };
  }

  return {
    gridColTemplate: widthListToTemplate(),
    resizeHandler,
    columns,
  };
};
