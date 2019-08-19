import { Component, OnInit } from '@angular/core';
import { APIService } from '../api.service';


@Component({
  selector: 'app-good',
  templateUrl: './good.component.html',
  styleUrls: ['./good.component.css']
})
export class GoodComponent implements OnInit {

  items: any[];
  currentPage: number = 1;
  totalItems: number = 0;

  constructor(private http_service: APIService ) { }

  ngOnInit() {
    this.getPage(this.currentPage);
  }

  getPage(page: number){
    this.http_service.getGoodList(page).subscribe((data: any) => {
      this.items = data.result;
      this.totalItems = data.count;
  });
  }

  pageChanged(evt: any){
    this.getPage(evt.page);
    this.currentPage = evt.page;
  }

}
