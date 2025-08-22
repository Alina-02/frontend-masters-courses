import { app, BrowserWindow, dialog, ipcMain } from "electron";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

type MarkdownFile = {
  content?: string;
  filePath?: string;
};

let currentFile: MarkdownFile = {
  content: "",
  filePath: undefined,
};

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });

  mainWindow.webContents.openDevTools({
    mode: "detach",
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const showOpenDialog = async (browserWindow: BrowserWindow) => {
  const result = await dialog.showOpenDialog(browserWindow, {
    properties: ["openFile"],
    filters: [{ name: "Markdown File", extensions: ["md"] }],
  });

  if (result.canceled) return;

  const [filePath] = result.filePaths;

  openFile(browserWindow, filePath);
};

const showExportDialog = async (browserWindow: BrowserWindow, html: string) => {
  const result = await dialog.showSaveDialog(browserWindow, {
    title: "Export HTML",
    filters: [{ name: "HTML File", extensions: ["html"] }],
  });

  if (result.canceled) return;

  const { filePath } = result;

  if (!filePath) return;

  exportFile(filePath, html);
};

const openFile = async (browserWindow: BrowserWindow, filePath: string) => {
  const content = await readFile(filePath, { encoding: "utf-8" });

  browserWindow.webContents.send("file-opened", content, filePath);
};

const exportFile = async (filePath: string, html: string) => {
  await writeFile(filePath, html, { encoding: "utf-8" });
};

ipcMain.on("show-open-dialog", (event) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  if (!browserWindow) return;

  showOpenDialog(browserWindow);
});

ipcMain.on("show-export-dialog", (event, html: string) => {
  const browserWindow = BrowserWindow.fromWebContents(event.sender);

  if (!browserWindow) return;

  showExportDialog(browserWindow, html);
});

// close app if all window are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const showSaveDialog = async (
  browserWindow: BrowserWindow,
  content: string
) => {
  const result = await dialog.showSaveDialog(browserWindow, {
    title: "Save Markdown",
    filters: [{ name: "Markdown File", extensions: ["md"] }],
  });

  if (result.canceled) return;
  const { filePath } = result;

  if (!filePath) return;

  saveFile(filePath, content);
};
