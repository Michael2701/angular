import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';

export  class EventData{
  evtName: string;
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiEndPoint = 'https://www.googleapis.com/customsearch/v1?key='+environment.googleApiKey;
  cx = '017576662512468239146:omuauf_lfve';
  constructor(private http: HttpClient) { }
  
  onSearchRequest(search: string){
    const s = search.split(' ').join('+');
    const params = new HttpParams().set('cx', this.cx).set('q',s);
    
    return this.http.get(this.apiEndPoint,{params});
  }

  onKeyEvent = new Subject<EventData>();
  onSearch = new Subject<void>();
}
