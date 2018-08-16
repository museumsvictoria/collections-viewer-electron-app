import { app, BrowserWindow } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import { enableLiveReload, addBypassChecker } from 'electron-compile';
import localShortcut from 'electron-localshortcut';

let mainWindow;

const isDevMode = process.execPath.match(/[\\/]electron/);

if (isDevMode) enableLiveReload({ strategy: 'react-hmr' });

// Bypass compilation of certain files
addBypassChecker(filePath => /\.(png|jpg)/.test(filePath));

// Ensure we only run one instance
const isAlreadyRunning = app.makeSingleInstance(() => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

if (isAlreadyRunning) {
  app.quit();
}

const createWindow = async () => {
  mainWindow = new BrowserWindow({
    x: 0,
    y: 0,
    width: 1920,
    height: 1080,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    show: false,
    backgroundColor: '#fff',
  });

  mainWindow.loadURL(`file://${__dirname}/app/index.html`);

  mainWindow.on('closed', () => {
    app.quit();
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow.setBounds({
      x: 0,
      y: 0,
      width: 1920,
      height: 1080,
    });
    mainWindow.webContents.setVisualZoomLevelLimits(1, 1);
    mainWindow.show();
  });
};

app.on('ready', () => {
  if (isDevMode) {
    installExtension(REACT_DEVELOPER_TOOLS);
  }

  localShortcut.register('Ctrl+Shift+I', () => {
    if (mainWindow) {
      mainWindow.webContents.toggleDevTools();
    }
  });

  createWindow();
});
