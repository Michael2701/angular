import { Component, OnInit } from '@angular/core';
import { BackgroundsService } from '../backgrounds.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  isMenuShown = false;
  constructor() { }

  ngOnInit(): void {

  }

  onShowSideMenu(){
    this.isMenuShown = !this.isMenuShown;
  }



}
