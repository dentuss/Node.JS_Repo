const http = require('http');
const fs = require('fs');
const qs = require('querystring');

// Function to serve the HTML form
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

// Create the HTTP server
const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Serve the login form on a GET request to "/"
        serveForm(res);
    } else if (req.method === 'POST' && req.url === '/login') {
        // Handle the form submission
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', () => {
            const formData = qs.parse(body);

            // Log the login and password in the server terminal
            console.log(`Login: ${formData.login}`);
            console.log(`Password: ${formData.password}`);

            // Respond to the user
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(`<h1>Authorization Successful</h1><p>Welcome, ${formData.login}!</p>`);
        });
    } else {
        // Handle 404 for other routes
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Start the server
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
