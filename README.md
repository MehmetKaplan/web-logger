# Web Logger

A lightweight Express-based HTTP server that logs incoming web requests to the console with customizable formatting options.

## Overview

Web Logger is a simple Node.js server built on Express that receives HTTP POST requests and logs them with various formatting styles. It's useful for debugging, monitoring API calls, or capturing webhook payloads.

## Features

- Multiple log formatting options (JSON, Pretty JSON, Indented Text)
- Customizable log headers with colored output
- Environment-based configuration for port and TLS
- Colored terminal output for better readability

## Installation

### Prerequisites

- Node.js (v12 or higher)
- npm

### Setup

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

This will install:
- `tamed-express-server` - Express server wrapper
- `tick-log` - Logging utility

## How to Use

### Starting the Server

```bash
node server.js
```

The server will start on the default port **3000** (or the port specified by the `WEB_LOGGER_PORT` environment variable).

### Configuration

Configure the server using environment variables:

```bash
# Set custom port (default: 3000)
export WEB_LOGGER_PORT=8080

# Enable HTTPS (optional - provide paths to TLS certificate and key)
export TLS_KEYPATH=/path/to/key.pem
export TLS_CERTPATH=/path/to/cert.pem

# Start the server
node server.js
```

### Sending Requests

Send POST requests to the server with a JSON body:

```bash
curl -X POST http://localhost:3000/web-logger \
  -H "Content-Type: application/json" \
  -d '{
    "webLogFormat": "JSON",
    "webLogHeader": "My API Call",
    "userId": 123,
    "action": "login",
    "timestamp": "2026-09-26T10:30:00Z"
  }'
```

### Log Format Options

The `webLogFormat` field in your request body determines how the data is logged:

#### 1. **JSON** (default)
Single-line JSON format with optional header
```
[timestamp] - Header: {"userId":123,"action":"login",...}
```

#### 2. **PRETTY-JSON**
Multi-line formatted JSON with header on separate line
```
[timestamp] - Header
	{
	  "userId": 123,
	  "action": "login",
	  ...
	}
```

#### 3. **INDENTED-TEXT**
Nested text format with key-value pairs
```
	[timestamp]
		Header
			userId: 123
			action: login
```

### Request Body Parameters

- **webLogFormat** (string, optional): Format for output. Options: `JSON`, `PRETTY-JSON`, `INDENTED-TEXT`. Default: `JSON`
- **webLogHeader** (string, optional): Header/label for the log entry. Appears in blue in the output
- **Other fields**: Any additional fields in the request body will be logged

### Examples

**Basic logging:**
```bash
curl -X POST http://localhost:3000/web-logger \
  -H "Content-Type: application/json" \
  -d '{"message": "User logged in", "userId": 42}'
```

**With pretty formatting:**
```bash
curl -X POST http://localhost:3000/web-logger \
  -H "Content-Type: application/json" \
  -d '{
    "webLogFormat": "PRETTY-JSON",
    "webLogHeader": "API Request",
    "endpoint": "/api/users",
    "method": "GET",
    "status": 200
  }'
```

**With custom port:**
```bash
export WEB_LOGGER_PORT=9000
node server.js

# In another terminal:
curl -X POST http://localhost:9000/web-logger \
  -H "Content-Type: application/json" \
  -d '{"event": "server_started"}'
```

## Project Structure

```
web-logger/
├── server.js                 # Main server entry point
├── handlers.js               # Request handler for webLogger endpoint
├── server-parameters.js      # Configuration from environment variables
├── package.json              # Project dependencies
└── README.md                 # This file
```

## API Endpoint

**POST** `/web-logger`

Logs the request body to the console with the specified format.

**Request Body:**
```json
{
  "webLogFormat": "JSON|PRETTY-JSON|INDENTED-TEXT",
  "webLogHeader": "Optional header text",
  "customField1": "value1",
  "customField2": "value2"
}
```

**Response:**
The server logs the information to stdout and doesn't return a response body.

## Troubleshooting

**Port already in use:**
```bash
# Use a different port
export WEB_LOGGER_PORT=3001
node server.js
```

**TLS errors:**
Ensure the paths in `TLS_KEYPATH` and `TLS_CERTPATH` are correct and the files exist:
```bash
ls -l /path/to/key.pem
ls -l /path/to/cert.pem
```

**Module not found errors:**
Reinstall dependencies:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Dependencies

- **tamed-express-server** (^3.0.2) - Wrapper around Express for simplified server setup
- **tick-log** (^1.1.4) - Logging utility with timestamp support

## License

Unlicensed
