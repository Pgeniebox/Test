  ipcMain.on('search', async (event, { root ,value}) => {
     const filePath = path.join(storageDirectory, 'database\\search',root,value);
     const result= [];

     fs.mkdir(filePath, { recursive: true }, (err)=>{
        if(err){event.reply('search-reply', { success: false, error: 'ERROR' });return;}
       var items;
            items =  fs.readdirSync(filePath);
            for (let item of items) {
                item = item.replaceAll('=',':').replaceAll('\'','"');
                try{ result.push(JSON.parse(item));}catch(e){}
            }
        
        if (result.length > 0) {
           event.reply('search-reply', { success: true, files: result });
        } else {
            event.reply('search-reply', { success: false, error: 'not found' });
        }


      
    });
     });
