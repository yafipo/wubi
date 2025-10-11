const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("eapi", {
  ipcSend: ipcRenderer.send,
  ipcRmListener: (channel, cb) => ipcRenderer.removeListener(channel, cb),
  ipcOn: (channel, cb) => ipcRenderer.on(channel, cb),
});
