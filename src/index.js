const { app, BrowserWindow } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1680,
      height: 1050
    })
  
    win.loadFile('src/assets/views/index.html')
  }

app.whenReady().then(() => {
    createWindow()
  })