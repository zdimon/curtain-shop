"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'curtains',
    password: '1q2w3e',
    port: 5432,
});
exports.default = pool;
//# sourceMappingURL=db.js.map