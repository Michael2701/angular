import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParentService {
  numbers: number[] = [1,2,3,4,5];
  constructor() { }
  
  getNumbers(){
    return this.numbers.slice();
  }

  addNumber(number: number){
    this.numbers.push(number);
    this.numberAdded.emit(this.numbers.slice());
  }

  chooseNum = new EventEmitter<number>();
  numberAdded = new EventEmitter<number[]>();

}
