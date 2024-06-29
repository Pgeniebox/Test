const {  ipcMain   } = require('electron');
const path = require('path');
const os = require('os');
const {
  Worker, isMainThread, parentPort, workerData,
} = require('node:worker_threads');

const workers = [];
const numCPUs = os.cpus().length;
ipcMain.on('setupWorker',()=>{
  if (isMainThread) {
    for (let i = 0; i < numCPUs; i++) {
      workers.push(new Worker(path.join(__dirname, 'worker')));
      workers[i].on('message', (e)=>{console.log(e)});
   }
   workers.push(null);
   }
});


ipcMain.on('workerSearch', async (event, data) => { 
  if(null!==workers[0]){
workers[0].postMessage(data)
let firstElement = workers.shift();
workers.push(firstElement);}else{
  console.log(null);
  let firstElement = workers.shift();
workers.push(firstElement);
}
});
