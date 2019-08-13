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

app.get("/good/list/:page/:perpage", good_api.getList);
app.get("/good/:id", good_api.getOne);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
})  