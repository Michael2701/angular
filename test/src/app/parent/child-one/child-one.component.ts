import { Component, OnInit, Input } from '@angular/core';
import { ParentService } from 'src/app/parent.service';

@Component({
  selector: 'app-child-one',
  templateUrl: './child-one.component.html',
  styleUrls: ['./child-one.component.scss']
})
export class ChildOneComponent implements OnInit {
  @Input() number: number;
  constructor(private parentService: ParentService) { }

  ngOnInit(): void {
  }

  chooseNumber(){
    this.parentService.chooseNum.emit(this.number);
  }

}
