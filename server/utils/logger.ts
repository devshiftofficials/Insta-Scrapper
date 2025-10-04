import fs from 'fs';
import path from 'path';

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

export const logger = {
  info: (message: string, meta?: any) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] INFO: ${message}`;
    console.log(logMessage);
    
    if (meta) {
      console.log(JSON.stringify(meta, null, 2));
    }
    
    // Write to file
    fs.appendFileSync(path.join(logsDir, 'app.log'), logMessage + '\n');
  },
  
  error: (message: string, error?: any) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${message}`;
    console.error(logMessage);
    
    if (error) {
      console.error(error);
      fs.appendFileSync(path.join(logsDir, 'error.log'), logMessage + '\n' + error.stack + '\n');
    }
    
    fs.appendFileSync(path.join(logsDir, 'app.log'), logMessage + '\n');
  },
  
  warn: (message: string, meta?: any) => {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] WARN: ${message}`;
    console.warn(logMessage);
    
    if (meta) {
      console.warn(JSON.stringify(meta, null, 2));
    }
    
    fs.appendFileSync(path.join(logsDir, 'app.log'), logMessage + '\n');
  },
  
  debug: (message: string, meta?: any) => {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] DEBUG: ${message}`;
      console.log(logMessage);
      
      if (meta) {
        console.log(JSON.stringify(meta, null, 2));
      }
    }
  }
};

