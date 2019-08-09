const TabGroup = require("electron-tabs");
let tabGroup = new TabGroup({
  closeButtonText: 'close tab',
  newTabButtonText: 'new tab',
  viewClass: 'etabs-view',
  newTab: () => {
    return {
      active: true,
      title: "Electron Tab Test",
      src: "https://www.google.com/",
      visible: true
    }
  }
});

tabGroup.addTab({
  active: true,
  title: "Electron Tab Test",
  src: "https://google.com",
  visible: true
});

tabGroup.on('active', (tab) => {
  const webview = tab.webview;
  webview.loadURL("https://www.google.com/");
})