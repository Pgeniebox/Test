const { app, BrowserWindow , ipcMain, dialog} = require('electron');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
let win;
let serverProcess;
function createWindow() {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      sandbox: true,     
      webSecurity: true,
      allowRunningInsecureContent: false,
      contentSecurityPolicy: "default-src 'self'; script-src 'self';",
      preload: path.join(__dirname, 'preload.js'),
      storage: {
        persistent: true,   
        maximum: false      
      }
    }
   
  });

  win.loadURL('http://localhost:3000');
  win.on('closed', () => {
    if (serverProcess) {
      process.kill(serverProcess.pid,0);
      serverProcess.kill();

    }
  });
}





app.on('ready', () => {
serverProcess = exec('node server.js', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error starting server: ${err}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
 
},{ stdio: 'inherit',detached: false });
createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
   
    app.quit();
  }
});

app.on('activate', () => {
if (BrowserWindow.getAllWindows().length === 0) {
  createWindow();
}
});

app.on('quit', () => {
  console.log(serverProcess.pid);
  
    if (serverProcess) {
      process.kill(serverProcess.pid,0);
      serverProcess.kill();
    }
  app.exit()
});