export const joinPaths = (...paths: string[]): string => {
  return paths.reduce(
    (prev, next) => joinPath(prev, next),
    paths[0].startsWith("/") ? "/" : "",
  );
};

export const joinPath = (a: string, b: string): string => {
  const leadingSlash = a.startsWith("/");

  const segmentsA = parsePath(a);
  const segmentsB = parsePath(b);

  const joinSegments = segmentsA.concat(segmentsB);
  const out = buildPath(joinSegments);
  return leadingSlash ? "/" + out : out;
};

const parsePath = (path: string): string[] => {
  return path.split("/").filter((val) => val !== "");
};

const buildPath = (segments: string[]): string => {
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

  return newSegments.join("/");
};
