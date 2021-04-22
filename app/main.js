const { app, BrowserWindow, Menu } = require('electron')
const getMenu = require('./menu')
const { registerXbee } = require('./xbee')
require('./ipc')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: 'assets/carriat.png',

    webPreferences: {
      nodeIntegration: true
    }
  })

  Menu.setApplicationMenu(getMenu(win))
  registerXbee(win)

  if (process.env.ENV === 'development') {
    win.loadURL('http://localhost:8080')
  } else {
    win.loadFile('index.html')
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
