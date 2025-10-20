import { app } from "electron";
import path from "path";

const RES_DIR = path.resolve(
  app.getAppPath(),
  app.isPackaged ? "../res" : "res"
);

export function resolveResPath(relativePath: string) {
  return path.resolve(RES_DIR, relativePath);
}
