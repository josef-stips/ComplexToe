const sqlite = require('better-sqlite3');
const db = new sqlite("../user.db");
exports.db = db;