'use strict'

const http = require('http');
const fs = require('fs');
const qs = require('querystring');


const serveForm = (res) => {
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error loading the form.');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
};


const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {

        serveForm(res);
    } else if (req.method === 'POST' && req.url === '/login') {

        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const formData = qs.parse(body);

            console.log(`Login: ${formData.login}`);
            console.log(`Password: ${formData.password}`);


            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<p>Welcome, ${formData.login}!</p>`);
        });
    } else {

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});


server.listen(8080, () => {
    console.log('Server running at http://localhost:8080/');
});
