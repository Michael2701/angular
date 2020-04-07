import { Component, OnInit, OnDestroy } from '@angular/core';
import { BackgroundsService } from './backgrounds.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy{
  bgImg: string;

  constructor(private bgService: BackgroundsService){}

  ngOnInit(){
    this.bgImg = this.bgService.backGrounds[0];
    this.bgService.choosenBackground.subscribe(
      imgUrl => { 
        this.bgImg = imgUrl;
        console.log(imgUrl);
    });
  }

  ngOnDestroy(){
    this.bgService.choosenBackground.unsubscribe();
  }


  
}
