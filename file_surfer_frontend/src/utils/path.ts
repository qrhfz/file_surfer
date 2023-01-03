export const joinPaths = (...paths: string[]): string => {
  return paths.reduce(
    (prev, next) => joinPath(prev, next),
    "",
  );
};

export const joinPath = (a: string, b: string): string => {
  const segmentsA = parsePath(a);
  const segmentsB = parsePath(b);

  const joinSegments = segmentsA.concat(segmentsB);
  const out = buildPath(joinSegments);
  return out;
};

export const parsePath = (path: string): string[] => {
  const segments = path.split("/").filter((val) => val !== "");
  if (path.startsWith("/")) {
    segments.splice(0, 0, "/");
  }

  return segments;
};

export const buildPath = (segments: string[]): string => {
  const newSegments: string[] = [];
  for (let index = 0; index < segments.length; index++) {
    const seg = segments[index];

    if (seg === ".") {
      continue;
    } else if (seg === "..") {
      newSegments.pop();
    } else {
      newSegments.push(seg);
    }
  }

  if (newSegments.length > 0 && newSegments[0] === "/") {
    newSegments.shift();
    return "/" + newSegments.join("/");
  }

  return newSegments.join("/");
};
