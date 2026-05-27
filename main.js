const { app, BrowserWindow } = require("electron");

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 600,
        frame: false,
        alwaysOnTop: true
    });

    win.loadURL("https://TON-SERVER.onrender.com/overlay.html");
}

app.whenReady().then(createWindow);