import type { IpcRendererEvent } from "electron";

interface IEAPI {
  require: typeof window.require;
  ipcSend: typeof Electron.ipcRenderer.send;
  ipcRmListener: typeof Electron.ipcRenderer.removeListener;
  ipcOn: typeof Electron.ipcRenderer.on;
}

declare global {
  interface Window {
    eapi: IEAPI;
  }
}

const eapi = window.eapi;

let msgId = 0;
export function sendMessage<K extends keyof IpcMessage>(
  channel: K,
  req: IpcMessage[K][0]
): Promise<IpcMessage[K][1]> {
  const id = ++msgId;
  eapi.ipcSend(channel, { id, data: req });
  return new Promise((resolve, reject) => {
    function handler(_: IpcRendererEvent, res: ResponseData<IpcMessage[K][1]>) {
      if (res.id === id) {
        console.log("IPC", "channel:", channel, "Req:", req, "Res:", res.data);
        if (res.err) {
          reject(res.err);
          setTimeout(() => alert(res.err), 0);
        } else {
          resolve(res.data);
        }
        eapi.ipcRmListener(channel, handler);
      }
    }
    eapi.ipcOn(channel, handler);
  });
}
