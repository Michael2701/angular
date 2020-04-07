import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  item: Object;
  itemId: number;

  constructor(
    private route: ActivatedRoute,
    private _http: HttpService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.itemId = +params.get('itemId');
      this._http.getBeerById(this.itemId).subscribe(data => {
        this.item = data;
        console.log(this.item);
      })
    })
  }

}
