import { RootReducer } from 'combine-reducers';
import { combineReducers } from 'redux';
import { appReducer } from './app';


export interface RootState {
    app: ReturnType<typeof appReducer>,
}

function rootReducer(): RootReducer {
    return combineReducers({
        appReducer
    });
}
export default rootReducer;