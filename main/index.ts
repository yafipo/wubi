import { app, BrowserWindow } from "electron";
import path from "path";
import fs from "fs/promises";
import "./ipc";
import { setCTable } from "./core";
import { resolveResPath } from "./base";

async function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: app.isPackaged
        ? path.resolve(app.getAppPath(), "dist/preload.js")
        : path.resolve(__dirname, "../public/preload.js"),
    },
  });
  if (app.isPackaged) {
    await win.loadFile("dist/index.html");
  } else {
    await win.loadURL("http://localhost:1040");
    win.webContents.openDevTools();
  }
}

app.whenReady().then(async () => {
  createWindow();

  const data = await fs.readFile(resolveResPath("data.csv"));
  const t = data.toString().split("\n");
  setCTable(t);

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
