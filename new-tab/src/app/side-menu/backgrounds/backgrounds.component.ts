import { Component, OnInit } from '@angular/core';
import { BackgroundsService } from 'src/app/backgrounds.service';

@Component({
  selector: 'app-backgrounds',
  templateUrl: './backgrounds.component.html',
  styleUrls: ['./backgrounds.component.scss']
})
export class BackgroundsComponent implements OnInit {
  backgroundImgs: string[] = [];

  constructor(private bgService: BackgroundsService) { }

  ngOnInit(): void {
    this.backgroundImgs = this.bgService.backGrounds;
  }

  onChooseBg(i: number){
    this.bgService.choosenBackground.next(this.backgroundImgs[i]);
  }
}
