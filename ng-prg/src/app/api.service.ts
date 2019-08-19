import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class APIService {
  constructor(private http: HttpClient) {}

   getGoodList(page: number){
     return this.http.get(`http://localhost:3000/good/list/${page}/10`);
   }
}
