"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'curtains',
    password: '1q2w3e',
    port: 5432,
});
class CategoryAPI {
    put(req, res) {
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield pool.query('SELECT * FROM shop_category ORDER BY id ASC');
            for (let category of result.rows) {
                const subcats = yield pool.query(`SELECT * FROM shop_subcategory where category_id=${category.id}`);
                category.subcategories = subcats.rows;
            }
            res.status(200).json(result.rows);
        });
    }
    getOne(req, res) { }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            const sql = 'INSERT INTO shop_subcategory(name, name_slug) VALUES($1, $2) RETURNING *';
            const values = [req.body.name, req.body.name_slug];
            try {
                const result = yield pool.query(sql, values);
                console.log(result.rows[0]);
                res.status(200).json({ status: 0, message: 'Ok' });
            }
            catch (err) {
                console.log(err.stack);
                res.status(200).json({ status: 1, message: 'Error!' });
            }
        });
    }
    delete(req, res) { }
}
exports.CategoryAPI = CategoryAPI;
//# sourceMappingURL=category.js.map