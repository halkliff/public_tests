const request = require('request');

const app = require('../app');
const debug = require('debug')('backend:server');
const http = require('http');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Create HTTP server.
 */

/**
 * Listen on provided port, on all network interfaces.
 */

const server = http.createServer(app).listen(port);

describe('GET /users', () => {
    test('It should return http status 200', () => {
        request.get('http://localhost:3000/api/users', (requestError, requestResponse, requestBody) => {
            expect(requestResponse.statusCode).toBe(200);
        });
    });
    test('It should have success equals to true in the body', () => {
        request.get('http://localhost:3000/api/users', (requestError, requestResponse, requestBody) => {
            expect(JSON.parse(requestBody).success).toBe(true);
        });
    });
    test('It should have the data in the body as the type array', () => {
        request.get('http://localhost:3000/api/users', (requestError, requestResponse, requestBody) => {
            expect(typeof JSON.parse(requestBody).data).toBe("array");
        });
    });
});

describe('GET /users/:username/details', () => {
    test('It should return http status 200', () => {
        request.get('http://localhost:3000/api/users/halkliff/details', (requestError, requestResponse, requestBody) => {
            expect(requestResponse.statusCode).toBe(200);
        });
    });
    test('It should have success equals to true in the body', () => {
        request.get('http://localhost:3000/api/users/halkliff/details', (requestError, requestResponse, requestBody) => {
            expect(JSON.parse(requestBody).success).toBe(true);
        });
    });
    test('It should have the data in the body as the type array', () => {
        request.get('http://localhost:3000/api/users/halkliff/details', (requestError, requestResponse, requestBody) => {
            expect(typeof JSON.parse(requestBody).data).toBe("array");
        });
    });
});

describe('GET /users/:username/repos', () => {
    test('It should return http status 200', () => {
        request.get('http://localhost:3000/api/users/halkliff/repos', (requestError, requestResponse, requestBody) => {
            expect(requestResponse.statusCode).toBe(200);
        });
    });
    test('It should have success equals to true in the body', () => {
        request.get('http://localhost:3000/api/users/halkliff/repos', (requestError, requestResponse, requestBody) => {
            expect(JSON.parse(requestBody).success).toBe(true);
        });
    });
    test('It should have the data in the body as the type array', () => {
        request.get('http://localhost:3000/api/users/halkliff/repos', (requestError, requestResponse, requestBody) => {
            expect(typeof JSON.parse(requestBody).data).toBe("array");
        });
    });
});

server.close();
