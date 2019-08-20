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
const db_1 = require("./db");
class Good {
    constructor() { }
    static serialize(json_obj) {
        return __awaiter(this, void 0, void 0, function* () {
            let obj = new Good();
            obj.id = json_obj.id;
            obj.name = json_obj.name;
            obj.name_slug = json_obj.name_slug;
            obj.desc = json_obj.desc;
            obj.subcategory_id = json_obj.subcategory_id;
            /// заполняем подкатегорию
            let sql_sub = 'SELECT * FROM shop_subcategory where id=$1';
            let result_sub = yield db_1.default.query(sql_sub, [obj.subcategory_id]);
            obj.subcategory = { 'name': result_sub.rows[0].name, 'name_slug': result_sub.rows[0].name_slug };
            //заполняем категорию
            let sql_cat = 'SELECT * FROM shop_category where id=$1';
            let result_cat = yield db_1.default.query(sql_cat, [result_sub.rows[0].id]);
            obj.category = { 'name': result_cat.rows[0].name, 'name_slug': result_cat.rows[0].name_slug };
            /// заполняем изображение
            let sql_image = 'SELECT * FROM shop_image where good_id=$1';
            let result_image = yield db_1.default.query(sql_image, [obj.id]);
            obj.image = { 'image': result_image.rows[0].image };
            return obj;
        });
    }
}
class GoodAPI {
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const sql = 'SELECT * FROM shop_good where id=$1';
            try {
                const result = yield db_1.default.query(sql, [id]);
                let good = yield Good.serialize(result.rows[0]);
                res.json(good);
            }
            catch (err) {
                console.log(err.stack);
                res.json({ status: 1, message: 'Error!' });
            }
        });
    }
    getList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const offset = req.params.perpage * req.params.page;
            const sql = 'SELECT * FROM shop_good limit $1 offset $2';
            try {
                const result = yield db_1.default.query(sql, [req.params.perpage, offset]);
                let out = { result: [], count: 0 };
                for (let row of result.rows) {
                    let good = yield Good.serialize(row);
                    out.result.push(good);
                }
                const sql_count = 'SELECT count(*) FROM shop_good';
                const result_count = yield db_1.default.query(sql_count);
                out.count = result_count.rows[0].count;
                res.json(out);
            }
            catch (err) {
                console.log(err.stack);
                res.status(200).json({ status: 1, message: 'Error!' });
            }
        });
    }
}
exports.GoodAPI = GoodAPI;
//# sourceMappingURL=good.js.map