const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

var win = null;
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
    // frame: false,
    // titleBarStyle: 'hidden',
    // transparent: true,
  });

  win.loadFile('./dist/index.html')
  // win.loadURL("http://localhost:4000");
}

app.whenReady().then(() => {
  createWindow();

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

