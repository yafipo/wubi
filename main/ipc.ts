import { IpcMainEvent, ipcMain } from "electron";
import { search } from "./core";

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
