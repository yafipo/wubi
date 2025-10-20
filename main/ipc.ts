import { IpcMainEvent, ipcMain } from "electron";
import fs from "fs/promises";
import { search } from "./core";
import { resolveResPath } from "./base";
import path from "path";

function addAsyncListener<K extends keyof IpcMessage>(
  channel: K,
  action: (
    req: IpcMessage[K][0],
    event: IpcMainEvent
  ) => Promise<IpcMessage[K][1]>
) {
  ipcMain.on(
    channel,
    async (e: IpcMainEvent, req: RequestData<IpcMessage[K][0]>) => {
      try {
        const result = await action(req.data, e);
        e.reply(channel, { id: req.id, data: result });
      } catch (ex) {
        e.reply(channel, { id: req.id, err: `${ex}` });
      }
    }
  );
}

addAsyncListener("search", async (req) => {
  return search(req);
});

addAsyncListener("tables", async (req) => {
  const files = (await fs.readdir(resolveResPath("tables")))
    .filter((item) => item.endsWith(".txt"))
    .map((item) => item.slice(0, -4));
  return files;
});

addAsyncListener("table", async (req) => {
  const file = resolveResPath(`tables/${req}.txt`);
  return (await fs.readFile(file)).toString().split("\n");
});
