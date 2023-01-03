export const joinPath = (a: string, b: string): string => {
  const segmentsA = parsePath(a);
  const segmentsB = parsePath(b);

  const joinSegments = segmentsA.concat(segmentsB);

  return "";
};

const parsePath = (path: string): string[] => {
  return path.split("/");
};

const buildPath = (segments: string[]): string => {
  const newSegments: string[] = [];
  for (let index = 0; index < segments.length; index++) {
    const seg = segments[index];

    if (seg === ".") {
      continue;
    } else if (seg === "..") {
      newSegments.pop();
    }
  }

  return newSegments.reduce((prev, next) => prev + next + "/");
};
