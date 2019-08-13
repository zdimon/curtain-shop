import {Request, Response} from "express";
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'curtains',
  password: '1q2w3e',
  port: 5432,
})

export class CategoryAPI {
    put(req: Request, res: Response){
       
    }

    async getAll(req: Request, res: Response){
        const result = await pool.query('SELECT * FROM shop_category ORDER BY id ASC')
        for(let category of result.rows){
            const subcats = await pool.query(`SELECT * FROM shop_subcategory where category_id=${category.id}`)
            category.subcategories = subcats.rows;
        }
        res.status(200).json(result.rows)        
    }

    getOne(req: Request, res: Response){}

    async post(req: Request, res: Response){
        console.log(req.body);
        const sql = 'INSERT INTO shop_subcategory(name, name_slug) VALUES($1, $2) RETURNING *'
        const values = [req.body.name, req.body.name_slug]
        
        try {
            const result = await pool.query(sql, values)
            console.log(result.rows[0])
            res.status(200).json({status: 0, message: 'Ok'}) 
          } catch (err) {
            console.log(err.stack)
            res.status(200).json({status: 1, message: 'Error!'}) 
          }
        
    }

    delete(req: Request, res: Response){}
}