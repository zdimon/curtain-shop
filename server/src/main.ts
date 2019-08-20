import * as express from "express";
import {Request, Response} from "express";
import { CategoryAPI } from './api/category';
const app = express();

import * as bodyParser from 'body-parser';
import { GoodAPI } from './api/good';
app.use(bodyParser.json()); 

const category_api = new CategoryAPI();
const good_api = new GoodAPI();

app.get("/category/all", category_api.getAll);
app.get("/category/one/:id", category_api.getOne);
app.delete("/category/delete/:id", category_api.delete);
app.post("/category/create", category_api.post);
app.put("/category/edit", category_api.put);

app.get("/good/list/:page/:perpage/:category?", good_api.getList);
app.get("/good/:id", good_api.getOne);
app.get("/good/search/:key", good_api.search);

app.post("/makeOrder", good_api.makeOrder);
app.post("/deleteOrder", good_api.makeOrder);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
})  