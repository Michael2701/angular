import * as parentActions from './parent.actions';

const initialState = {};

export function parentReducer(
    state = initialState,
    action: parentActions.ParentActions
){
    switch(action.type){
        case parentActions.FETCH_DATA:
            return {
                ...state,
                ...action.payload
            }
    }
}

export class fromParentReduser{
    
}
