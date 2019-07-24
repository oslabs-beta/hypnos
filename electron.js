const electron = require('electron');
const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu } = electron;

let mainWindow;

//listen for app to be ready
app.on('ready', function () {
    //create new window
    mainWindow = new BrowserWindow({});
    //load html into the window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, './build/index.html'),
        protocol: 'file:',
        slashes: true
    }));


    //build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //insert Menu
    Menu.setApplicationMenu(mainMenu);
})

//create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'quit',
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                //should be available only in dev environment
                open: false,
                label: 'DevTools',
                click() {
                    if (!this.open) {
                        mainWindow.webContents.openDevTools()
                        this.open = true;
                    } else {
                        mainWindow.webContents.closeDevTools();
                        this.open = false;
                    }
                },
                accelerator: 'f12'
            }
        ]
    }

];