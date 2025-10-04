"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logsDir = path_1.default.join(process.cwd(), 'logs');
if (!fs_1.default.existsSync(logsDir)) {
    fs_1.default.mkdirSync(logsDir, { recursive: true });
}
exports.logger = {
    info: (message, meta) => {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] INFO: ${message}`;
        console.log(logMessage);
        if (meta) {
            console.log(JSON.stringify(meta, null, 2));
        }
        fs_1.default.appendFileSync(path_1.default.join(logsDir, 'app.log'), logMessage + '\n');
    },
    error: (message, error) => {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] ERROR: ${message}`;
        console.error(logMessage);
        if (error) {
            console.error(error);
            fs_1.default.appendFileSync(path_1.default.join(logsDir, 'error.log'), logMessage + '\n' + error.stack + '\n');
        }
        fs_1.default.appendFileSync(path_1.default.join(logsDir, 'app.log'), logMessage + '\n');
    },
    warn: (message, meta) => {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] WARN: ${message}`;
        console.warn(logMessage);
        if (meta) {
            console.warn(JSON.stringify(meta, null, 2));
        }
        fs_1.default.appendFileSync(path_1.default.join(logsDir, 'app.log'), logMessage + '\n');
    },
    debug: (message, meta) => {
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
//# sourceMappingURL=logger.js.map