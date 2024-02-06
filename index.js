const http = require('http');
const fs = require('fs');
const multer = require('multer');
const upload =require("./fileStore/fileStore")


// Create an HTTP server
const server = http.createServer((req, res) => {
    // Log message when server starts listening on port 5500
    console.log('Server listening on port 5500');

    // Route handling
    if (req.url === '/') {
        // Home page
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is Home Page');
    } else if (req.url === '/about') {
        // About page
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is About Page');
    } else if (req.url === '/contact') {
        // Contact page
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.write('This is Contact Page');
    } else if (req.url === '/file-write') {
        // Write to file
        fs.writeFile('demo.txt', 'hello world', (err) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error writing to file');
            } else {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write('File written successfully');
            }
            res.end();
        });
    } else if (req.url === '/upload' && req.method === 'POST') {
        // Handle file upload using multer
        upload.single('file')(req, res, (err) => {
            if (err) {
                console.error(err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.write('Error uploading file');
                return res.end();
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write('File uploaded successfully');
            res.end();
        });
    } else {
        // Invalid URL
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('404 Not Found');
    }
    res.end();
});

// Start the server on port 5500
server.listen(5500);
