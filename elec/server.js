const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const app = express();


const storageDirectory = 'C:/database'; // Change this to your desired directory

// Ensure the storage directory exists
if (!fs.existsSync(storageDirectory)) {
  fs.mkdirSync(storageDirectory, { recursive: true });
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse JSON request bodies

// POST route to create a file
app.post('/api/files', (req, res) => {
  const fp = Object.values(req.body)[0];
  const filename = Object.values(req.body)[1];
  const content = Object.values(req.body)[2];

 const g= Object.values(req.body);
  if (!filename || !content) {
    return res.status(400).json({ error: 'filename and content are required' ,g});
  }

  if (!fs.existsSync(storageDirectory+fp)) {
    fs.mkdirSync(storageDirectory+fp, { recursive: true });
  }
  

  fs.writeFile(filename, content, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to create file', err });
    }
    res.status(201).json({ message: 'File created successfully' });
  });
});

// GET route to retrieve a file
app.get('/api/files/:filename', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(storageDirectory, filename);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }
    res.status(200).json({ content: data });
  });
});


const PORT = 3000;

const server = http.createServer(app);

server.listen(PORT,'192.168.1.101' ,() => {
  console.log(`Server running at http://localhost:${PORT}/`);
});