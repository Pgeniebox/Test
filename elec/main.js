const { app, BrowserWindow , ipcMain, dialog} = require('electron');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const os = require('os');
let win;
let serverProcess;
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    const addresses = interfaces[interfaceName];
    for (const address of addresses) {
      if (!address.internal && address.family === 'IPv4') {
        return address.address;
      }
    }
  }
  return '127.0.0.1'; 
}
function createWindow() {
   win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      contentSecurityPolicy: "default-src : *; script-src :*;",
      storage: {
        persistent: true,   
        maximum: false      
      }
    }
   
  });

  const serverIp = getLocalIpAddress();
  win.loadURL(`http://${serverIp}:3000`);
  win.on('closed', () => {
    exec('taskkill /F /IM node.exe');
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
  app.exit()
});