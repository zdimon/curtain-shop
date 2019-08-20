"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const category_1 = require("./api/category");
const app = express();
const bodyParser = require("body-parser");
const good_1 = require("./api/good");
app.use(bodyParser.json());
const category_api = new category_1.CategoryAPI();
const good_api = new good_1.GoodAPI();
app.get("/category/all", category_api.getAll);
app.get("/category/one/:id", category_api.getOne);
app.delete("/category/delete/:id", category_api.delete);
app.post("/category/create", category_api.post);
app.put("/category/edit", category_api.put);
app.get("/good/list/:page/:perpage", good_api.getList);
app.get("/good/:id", good_api.getOne);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
});
//# sourceMappingURL=main.js.map