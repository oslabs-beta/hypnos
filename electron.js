const electron = require('electron');
const { clipboard } = require('electron');
const url = require('url');
const path = require('path');
// const { ELECTRON_IS_DEV: isDev2 } = require('dotenv').config();
// require('dotenv').config();

// console.log('process env: ', process.env);
// const isDev2 = Number(process.env.ELECTRON_IS_DEV);
const isDev = require('electron-is-dev');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// listen for app to be ready
app.on('ready', () => {
  // create new window
  mainWindow = new BrowserWindow({});
  // load html into the window
  console.log('is dev: ', isDev);
  //   console.log('is dev2: ', isDev2);
  mainWindow.loadURL(url.format({
    pathname: isDev ? '//localhost:3000' : path.join(__dirname, './build/index.html'),
    protocol: isDev ? 'http:' : 'file:',
    slashes: true,
  }));


  // build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // insert Menu
  Menu.setApplicationMenu(mainMenu);
});

// create menu template
const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'quit',
        click() {
          app.quit();
        },
        accelerator: 'CommandOrControl+Q',
      },
      {
        label: 'Copy',
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:' },
      { label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:' },
      { type: 'separator' },
      { label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:' },
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
      { label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:' },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        // should be available only in dev environment
        open: false,
        label: 'DevTools',
        click() {
          if (!this.open) {
            mainWindow.webContents.openDevTools();
            this.open = true;
          } else {
            mainWindow.webContents.closeDevTools();
            this.open = false;
          }
        },
        accelerator: 'f12',
      },
    ],
  },

];
