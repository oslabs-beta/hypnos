const electron = require('electron');
// not presently using clipboard
const { clipboard } = require('electron');
const url = require('url');
const path = require('path');

// to determine whether a dev environ is being un
const isDev = require('electron-is-dev');
// const isDev= false;
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

// listen for app to be ready
// NOTE: LOCAL HOST CHANGED TO 8080 SO EXPRESS CAN SERVE UP ELECTORN
app.on('ready', () => {
  // create new window
  mainWindow = new BrowserWindow({ width: 1170, height: 800 });
  // load html into the window
  console.log('Dev environment on: ', isDev);
  mainWindow.loadURL(url.format({
    // ssiwtched back to 3000 from 8080 because no longer using server
    pathname: isDev ? '//localhost:3000' : path.join(__dirname, './build/index.html'),
    protocol: isDev ? 'http:' : 'file:',
    slashes: true,
  }));

  // build menu from template
  if (isDev) mainMenuTemplate.push(devToolsMenu);
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
        label: 'Quit',
        click() {
          app.quit();
        },
        accelerator: 'CommandOrControl+Q',
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
];


const devToolsMenu = {
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
};
