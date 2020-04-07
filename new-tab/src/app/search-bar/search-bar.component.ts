import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { SearchService, EventData } from '../search.service';
import { NgForm } from '@angular/forms';
import { SearchModel } from '../search-bar/search.model';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  

  @ViewChild('searchForm',{static: false}) searchForm: NgForm;
  
  @HostListener("document:keydown",['$event']) keyDown(event: KeyboardEvent){
    this.searchService.onKeyEvent.next({evtName: event.key})
  }


  searchResponse: SearchModel[];


  constructor(
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    const search = this.searchForm.value.app_search 
    
    this.searchService.onSearchRequest(search).subscribe(
      responce => {
        this.searchResponse = responce['items']; 
        this.searchService.onSearch.next();
      },
      error => {
        console.error(error.error.error.message);
      }
    )
  }

}
