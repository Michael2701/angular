import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SearchModel } from '../search.model';
import { SearchService, EventData } from 'src/app/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-resuls.component.html',
  styleUrls: ['./search-resuls.component.scss']
})
export class SearchResulsComponent implements OnInit, OnDestroy {
  @ViewChild('searchResultElms') searchResultElms: ElementRef;
  @Input() items: SearchModel[];
  keyEventSub: Subscription;
  onSearchSub: Subscription;
  children: HTMLCollection;
  eventdata: EventData;
  choosenElement: any;
  activeElementIndex = 0;
  elementsLength = 0;

  constructor( private searchService: SearchService) { }

  ngOnInit(): void {
    this.onSearchSub = this.searchService.onSearch.subscribe( () => {
      this.handleSerchEvent()
    })
    
    this.keyEventSub = this.searchService.onKeyEvent.subscribe(event => {
      this.setData(event)
      this.handleArrowEventes(event)
    })
  }

  private removeClasses(elements: HTMLCollection){
    for(let i = 0; i < elements.length; i++){
      elements[i].className = '';
    }
  }

  private handleSerchEvent(){
    this.activeElementIndex = 0;
    this.children = this.searchResultElms.nativeElement.childNodes;
    this.elementsLength = this.children.length;
    this.children[this.activeElementIndex]['className'] = 'active';
  }

  private handleArrowEventes(event: EventData){
    switch(event.evtName){
      case 'ArrowUp':
        this.handleArrowUp()
      break;
      case 'ArrowDown':
        this.handleArrowDown()
      break;
    }
  }

  private handleArrowUp(){
    if(this.activeElementIndex > 0){
      this.removeClasses( this.children );
      this.activeElementIndex--;
      this.children[this.activeElementIndex]['className'] = 'active';
      this.choosenElement = this.children[this.activeElementIndex];
    }
  }

  private handleArrowDown(){
    if(this.activeElementIndex < (this.elementsLength-2)){
      this.removeClasses( this.children );
      this.activeElementIndex++;
      this.children[this.activeElementIndex]['className'] = 'active';
      this.choosenElement = this.children[this.activeElementIndex];
    }
  }

  private setData(event: EventData){
    if(event.evtName === 'ArrowUp' || event.evtName == 'ArrowDown'){
      this.children = this.searchResultElms.nativeElement.childNodes;
      this.elementsLength = this.children.length;
    }
  }

  ngOnDestroy(){
    this.onSearchSub.unsubscribe();
    this.keyEventSub.unsubscribe();
  }

}
