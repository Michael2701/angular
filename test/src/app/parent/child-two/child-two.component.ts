import { Component, OnInit, ViewChild } from '@angular/core';
import { ParentService } from 'src/app/parent.service';

@Component({
  selector: 'app-child-two',
  templateUrl: './child-two.component.html',
  styleUrls: ['./child-two.component.scss']
})
export class ChildTwoComponent implements OnInit {
  number: number;
  @ViewChild('newNumber') newNumber: HTMLInputElement;
  constructor(private parentService: ParentService) { 
    this.parentService.chooseNum.subscribe(
      (num: number) => { 
        this.number = num;
        console.log(num);
      }
    );
  }

  ngOnInit(): void {
  }

  addNumber(){
    console.log(this.newNumber['nativeElement'].value);
    this.parentService.addNumber(this.newNumber['nativeElement'].value);
  }

}
