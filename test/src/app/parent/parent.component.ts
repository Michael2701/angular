import { Component, OnInit } from '@angular/core';

import { ParentService } from '../parent.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  numbers: number[] = [];
  constructor(
    private parentService: ParentService,
    private router: Router,
    private activeRoute: ActivatedRoute,
  ) { 
    this.parentService.numberAdded.subscribe(
      (numbers: number[]) => {
        this.numbers = numbers;
      }
    )
  }

  ngOnInit(): void {
    this.numbers = this.parentService.getNumbers();
  }



}
