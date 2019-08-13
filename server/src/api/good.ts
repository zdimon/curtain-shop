import {Request, Response} from "express";
import pool from './db';

class Good{
  id: number;
  name: string;
  name_slug: string;
  desc: string;
  subcategory_id: number;
  subcategory: any;
  image: any;

  constructor(){}

  public static async serialize(json_obj: any){
    let obj = new Good();
    obj.id = json_obj.id;
    obj.name = json_obj.name;
    obj.name_slug = json_obj.name_slug;
    obj.desc = json_obj.desc;
    obj.subcategory_id = json_obj.subcategory_id;
    /// заполняем подкатегорию
    let sql_sub = 'SELECT * FROM shop_subcategory where id=$1';
    let result_sub = await pool.query(sql_sub,[obj.subcategory_id]);
    obj.subcategory = {'name': result_sub.rows[0].name, 'name_slug': result_sub.rows[0].name_slug};
    /// заполняем изображение
    let sql_image = 'SELECT * FROM shop_image where good_id=$1';
    let result_image = await pool.query(sql_image,[obj.id]);
    obj.image = {'image': result_image.rows[0].image};    
    return obj;
  }

}

export class GoodAPI {

    async getOne(req: Request, res: Response){
       const id = req.params.id;
       const sql = 'SELECT * FROM shop_good where id=$1';
       try {
        const result = await pool.query(sql,[id]);
        let good = await Good.serialize(result.rows[0]);
          res.json(good);
       } catch (err) {
          console.log(err.stack)
          res.json({status: 1, message: 'Error!'});
       }
    }

    async getList(req: Request, res: Response){
      const id = req.params.id;
      const offset = req.params.perpage * req.params.page;
      const sql = 'SELECT * FROM shop_good limit $1 offset $2';
      try {
        const result = await pool.query(sql,[req.params.perpage,offset]);
        let out = {result: [], count: 0};
        for(let row of result.rows){
          let good = await Good.serialize(row);
          out.result.push(good);
        }
        const sql_count = 'SELECT count(*) FROM shop_good';
        const result_count = await pool.query(sql_count);
        out.count = result_count.rows[0].count;
        res.json(out);
        } catch (err) {
          console.log(err.stack)
          res.status(200).json({status: 1, message: 'Error!'}) 
        }

   }

}