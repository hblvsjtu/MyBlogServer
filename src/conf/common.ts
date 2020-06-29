const path = require('path');

export const BASE_DIR = path.resolve(__dirname, '../../MyBlog/dist');

export const DEFAULT_FILE = 'index.html';

export const MODEL_DATA_DIR = path.resolve(__dirname, '../debug');

export const REDIS_EXPIRES = 24 * 60 * 60; // 秒

export const PORT = 3000; // 端口号
