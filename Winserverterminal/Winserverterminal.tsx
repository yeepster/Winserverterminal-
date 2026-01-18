import React, { useState, useRef, useEffect } from 'react';

export default function ServerTerminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [currentDir, setCurrentDir] = useState('C:\\Server');
  const [isConnected, setIsConnected] = useState(false);
  const [serverAddress, setServerAddress] = useState('');
  const terminalRef = useRef(null);

  // Simulated complete file system with actual code
  const fileSystem = {
    'C:\\Server': {
      type: 'dir',
      contents: ['public', 'src', 'config', 'logs', 'server.js', 'package.json']
    },
    'C:\\Server\\public': {
      type: 'dir',
      contents: ['index.html', 'style.css', 'app.js', 'images']
    },
    'C:\\Server\\public\\images': {
      type: 'dir',
      contents: ['logo.png', 'banner.jpg']
    },
    'C:\\Server\\src': {
      type: 'dir',
      contents: ['routes', 'database.js', 'auth.js', 'utils.js']
    },
    'C:\\Server\\src\\routes': {
      type: 'dir',
      contents: ['api.js', 'users.js']
    },
    'C:\\Server\\config': {
      type: 'dir',
      contents: ['database.json', 'server.json']
    },
    'C:\\Server\\logs': {
      type: 'dir',
      contents: ['access.log', 'error.log']
    },
    'C:\\Server\\server.js': {
      type: 'file',
      content: `const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/api/users', (req, res) => {
  const users = db.query('SELECT * FROM users');
  res.json(users);
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Authentication logic here
  res.json({ token: 'abc123xyz' });
});

// Start server
app.listen(port, () => {
  console.log(\`Server running on port \${port}\`);
});`
    },
    'C:\\Server\\package.json': {
      type: 'file',
      content: `{
  "name": "web-server",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2",
    "mysql": "^2.18.1",
    "dotenv": "^16.0.3"
  },
  "scripts": {
    "start": "node server.js"
  }
}`
    },
    'C:\\Server\\public\\index.html': {
      type: 'file',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Web App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Welcome to My Website</h1>
  <div id="app"></div>
  <script src="app.js"></script>
</body>
</html>`
    },
    'C:\\Server\\public\\style.css': {
      type: 'file',
      content: `body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}

#app {
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`
    },
    'C:\\Server\\public\\app.js': {
      type: 'file',
      content: `// Frontend JavaScript
fetch('/api/users')
  .then(res => res.json())
  .then(users => {
    const app = document.getElementById('app');
    users.forEach(user => {
      const div = document.createElement('div');
      div.textContent = user.name;
      app.appendChild(div);
    });
  });`
    },
    'C:\\Server\\src\\database.js': {
      type: 'file',
      content: `const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'password123',
  database: 'webapp_db'
});

function query(sql, params) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
}

module.exports = { query };`
    },
    'C:\\Server\\src\\auth.js': {
      type: 'file',
      content: `const jwt = require('jsonwebtoken');
const SECRET = 'my-secret-key-12345';

function generateToken(userId) {
  return jwt.sign({ userId }, SECRET, { expiresIn: '24h' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };`
    },
    'C:\\Server\\src\\utils.js': {
      type: 'file',
      content: `function validateEmail(email) {
  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return regex.test(email);
}

function sanitizeInput(input) {
  return input.replace(/[<>]/g, '');
}

module.exports = { validateEmail, sanitizeInput };`
    },
    'C:\\Server\\src\\routes\\api.js': {
      type: 'file',
      content: `const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
  res.json({ 
    status: 'online',
    uptime: process.uptime(),
    memory: process.memoryUsage()
  });
});

module.exports = router;`
    },
    'C:\\Server\\src\\routes\\users.js': {
      type: 'file',
      content: `const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/', async (req, res) => {
  const users = await db.query('SELECT * FROM users');
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  await db.query('INSERT INTO users SET ?', { name, email });
  res.json({ success: true });
});

module.exports = router;`
    },
    'C:\\Server\\config\\database.json': {
      type: 'file',
      content: `{
  "host": "localhost",
  "port": 3306,
  "username": "admin",
  "password": "password123",
  "database": "webapp_db",
  "connectionLimit": 10
}`
    },
    'C:\\Server\\config\\server.json': {
      type: 'file',
      content: `{
  "port": 3000,
  "environment": "production",
  "cors": {
    "enabled": true,
    "origins": ["http://localhost:3000"]
  },
  "rateLimit": {
    "windowMs": 900000,
    "max": 100
  }
}`
    },
    'C:\\Server\\logs\\access.log': {
      type: 'file',
      content: `[2026-01-18 14:32:01] GET /api/users 200 45ms
[2026-01-18 14:32:15] POST /api/login 200 123ms
[2026-01-18 14:33:42] GET /api/status 200 12ms
[2026-01-18 14:34:01] GET /index.html 200 8ms
[2026-01-18 14:34:02] GET /style.css 200 5ms
[2026-01-18 14:35:18] POST /api/users 201 67ms`
    },
    'C:\\Server\\logs\\error.log': {
      type: 'file',
      content: `[2026-01-18 12:15:33] ERROR: Database connection failed
[2026-01-18 12:15:34] Retrying connection...
[2026-01-18 12:15:35] SUCCESS: Database connected
[2026-01-18 13:22:41] WARNING: High memory usage detected`
    },
    'C:\\Server\\public\\images\\logo.png': {
      type: 'file',
      content: '[BINARY FILE - PNG IMAGE DATA]'
    },
    'C:\\Server\\public\\images\\banner.jpg': {
      type: 'file',
      content: '[BINARY FILE - JPEG IMAGE DATA]'
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const addOutput = (text, isError = false) => {
    setHistory(prev => [...prev, { text, isError, isCommand: false }]);
  };

  const simulateConnection = (address, callback) => {
    addOutput('Establishing SSH connection...');
    setTimeout(() => {
      addOutput('Authenticating...');
      setTimeout(() => {
        addOutput('Verifying credentials...');
        setTimeout(() => {
          addOutput(`Successfully connected to ${address}`);
          addOutput('Welcome to the server terminal!\n');
          callback();
        }, 500);
      }, 500);
    }, 500);
  };

  const executeCommand = (cmd) => {
    setHistory(prev => [...prev, { text: isConnected ? `${currentDir}> ${cmd}` : `> ${cmd}`, isCommand: true }]);

    const parts = cmd.trim().split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    // Special commands that work before connection
    if (command === 'connect') {
      if (args.length === 0) {
        addOutput('Usage: connect <server-address>', true);
        addOutput('Example: connect 192.168.1.100');
        addOutput('Or try: connect demo.server.com');
        return;
      }
      const address = args[0];
      setServerAddress(address);
      simulateConnection(address, () => {
        setIsConnected(true);
      });
      return;
    }

    if (command === 'demo') {
      setServerAddress('demo.server.com');
      addOutput('Loading demo server...');
      setTimeout(() => {
        addOutput('Demo server loaded successfully!');
        addOutput('You are now connected to a simulated web server.\n');
        setIsConnected(true);
      }, 800);
      return;
    }

    // Check if connected for all other commands
    if (!isConnected) {
      addOutput('ERROR: Not connected to any server.', true);
      addOutput('Use "connect <address>" to connect to a server.');
      addOutput('Or use "demo" to try the demo server.');
      return;
    }

    switch (command) {
      case 'help':
        addOutput(`Available Commands:
  dir              - List files and directories
  cd <path>        - Change directory
  type <file>      - Display file contents
  tree             - Show directory structure
  cat <file>       - Same as type
  ls               - Same as dir
  pwd              - Print current directory
  clear            - Clear screen
  netstat          - Show server network status
  ps               - Show running processes
  disconnect       - Disconnect from server
  help             - Show this help message`);
        break;

      case 'disconnect':
        addOutput(`Disconnecting from ${serverAddress}...`);
        setTimeout(() => {
          addOutput('Connection closed.\n');
          setIsConnected(false);
          setServerAddress('');
          setCurrentDir('C:\\Server');
        }, 500);
        break;

      case 'dir':
      case 'ls':
        const dirContents = fileSystem[currentDir];
        if (dirContents && dirContents.type === 'dir') {
          addOutput(`\nDirectory of ${currentDir}\n`);
          dirContents.contents.forEach(item => {
            const itemPath = `${currentDir}\\${item}`;
            const itemData = fileSystem[itemPath];
            const isDir = itemData && itemData.type === 'dir';
            addOutput(`${isDir ? '<DIR>' : '     '}  ${item}`);
          });
        }
        break;

      case 'cd':
        if (args.length === 0) {
          addOutput(currentDir);
        } else if (args[0] === '..') {
          const parts = currentDir.split('\\');
          if (parts.length > 2) {
            parts.pop();
            setCurrentDir(parts.join('\\'));
          }
        } else {
          const newPath = args[0].startsWith('C:') ? args[0] : `${currentDir}\\${args[0]}`;
          if (fileSystem[newPath] && fileSystem[newPath].type === 'dir') {
            setCurrentDir(newPath);
          } else {
            addOutput(`The system cannot find the path specified.`, true);
          }
        }
        break;

      case 'type':
      case 'cat':
        if (args.length === 0) {
          addOutput('The syntax of the command is incorrect.', true);
        } else {
          // Handle relative paths with backslashes or forward slashes
          let filePath;
          const argPath = args.join(' '); // Handle filenames with spaces
          
          if (argPath.startsWith('C:')) {
            filePath = argPath;
          } else if (argPath.includes('\\') || argPath.includes('/')) {
            // Relative path with directory separator
            const normalizedPath = argPath.replace(/\//g, '\\');
            filePath = `${currentDir}\\${normalizedPath}`;
          } else {
            // Just a filename in current directory
            filePath = `${currentDir}\\${argPath}`;
          }
          
          const file = fileSystem[filePath];
          if (file && file.type === 'file') {
            addOutput(`\n${file.content}\n`);
          } else if (file && file.type === 'dir') {
            addOutput(`${argPath} is a directory, not a file.`, true);
          } else {
            addOutput(`The system cannot find the file specified.`, true);
          }
        }
        break;

      case 'tree':
        const buildTree = (path, prefix = '') => {
          const dir = fileSystem[path];
          if (!dir || dir.type !== 'dir') return '';
          
          let result = '';
          dir.contents.forEach((item, idx) => {
            const isLast = idx === dir.contents.length - 1;
            const itemPath = `${path}\\${item}`;
            const itemData = fileSystem[itemPath];
            const isDir = itemData && itemData.type === 'dir';
            
            result += `${prefix}${isLast ? '└──' : '├──'} ${item}${isDir ? '\\' : ''}\n`;
            
            if (isDir) {
              result += buildTree(itemPath, prefix + (isLast ? '    ' : '│   '));
            }
          });
          return result;
        };
        addOutput(`${currentDir}\n${buildTree(currentDir)}`);
        break;

      case 'pwd':
        addOutput(currentDir);
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        break;

      case 'netstat':
        addOutput(`Active Connections:

  Proto  Local Address          Foreign Address        State
  TCP    0.0.0.0:3000           0.0.0.0:0              LISTENING
  TCP    ${serverAddress}:3000     192.168.1.50:54231     ESTABLISHED
  TCP    ${serverAddress}:3000     192.168.1.51:54232     ESTABLISHED
  TCP    0.0.0.0:3306           0.0.0.0:0              LISTENING`);
        break;

      case 'ps':
        addOutput(`  PID  Process Name              Memory    CPU
  1234 node server.js          124 MB    2.3%
  1235 mysqld                  512 MB    5.1%
  1236 nginx                    45 MB    0.8%`);
        break;

      case '':
        break;

      default:
        addOutput(`'${command}' is not recognized as an internal or external command.`, true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  return (
    <div className="w-full h-screen bg-black text-white font-mono p-0 m-0">
      <div className="h-8 bg-gray-800 flex items-center px-2 border-b border-gray-600">
        <div className="text-sm">
          Command Prompt - {isConnected ? `Connected to ${serverAddress}` : 'Not Connected'}
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="h-[calc(100vh-8rem)] overflow-y-auto p-4 text-sm"
        style={{ backgroundColor: '#0C0C0C' }}
      >
        <div className="mb-4">
          <div className="text-gray-400">Microsoft Windows [Version 10.0.19045.3803]</div>
          <div className="text-gray-400">(c) Microsoft Corporation. All rights reserved.</div>
          <div className="mt-2 text-yellow-400">═══════════════════════════════════════════════════</div>
          <div className="text-yellow-400">    SERVER CONNECTION REQUIRED</div>
          <div className="text-yellow-400">═══════════════════════════════════════════════════</div>
          <div className="mt-2 text-gray-300">Before you can browse the server, you must connect:</div>
          <div className="mt-1 text-green-400">  • Type "demo" for a quick demo server</div>
          <div className="text-green-400">  • Type "connect &lt;address&gt;" to connect to a real server</div>
          <div className="mt-1 text-gray-400">Example: connect 192.168.1.100</div>
        </div>

        {history.map((item, idx) => (
          <div key={idx} className={`mb-1 ${item.isError ? 'text-red-400' : ''}`}>
            {item.isCommand ? (
              <div className="text-green-400">{item.text}</div>
            ) : (
              <div className="whitespace-pre-wrap">{item.text}</div>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">
            {isConnected ? `${currentDir}>` : '>'}
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none text-white"
            autoFocus
            spellCheck={false}
          />
        </form>
      </div>

      <div className="h-12 bg-gray-900 border-t border-gray-700 flex items-center px-4 text-xs text-gray-400">
        <div>
          {isConnected 
            ? `Connected to: ${serverAddress} | Current Directory: ${currentDir}` 
            : 'Status: Disconnected | Type "demo" or "connect <address>" to begin'}
        </div>
      </div>
    </div>
  );
}