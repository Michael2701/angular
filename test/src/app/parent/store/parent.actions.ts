import { Action } from '@ngrx/store';

export interface MeteoData{

}

export const FETCH_DATA = '[PARENT] FETCH DATA';

export class FetchData implements Action{
    readonly type = FETCH_DATA;
    constructor(public payload:any){}
}

export type ParentActions = FetchData;