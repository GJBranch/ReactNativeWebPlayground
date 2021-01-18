import { applyMiddleware, createStore, Dispatch, AnyAction, Middleware, Store, Reducer } from 'redux';
import functionMiddleware from './middleware/function';
import importMiddleware from './middleware/import';
import intervalMiddleware from './middleware/interval';
import promiseMiddleware from './middleware/promise';
import timeoutMiddleware from './middleware/timeout';
import waitForMiddleware from './middleware/waitFor';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const logger: Middleware<{}, any, Dispatch<AnyAction>> = createLogger();

let store: Store<Reducer<{ app: any; }>, any> & { dispatch: any; };

function init(): Store<Reducer<{ app: any; }>, any> & { dispatch: any; } {
    if (process.env.NODE_ENV === 'production') {
        store = createStore(rootReducer, {}, applyMiddleware(importMiddleware, timeoutMiddleware, intervalMiddleware, waitForMiddleware, functionMiddleware, promiseMiddleware));
    } else {
        store = createStore(rootReducer, {}, applyMiddleware(importMiddleware, timeoutMiddleware, intervalMiddleware, waitForMiddleware, functionMiddleware, promiseMiddleware, logger));
    }
    return store;
}

function getInstance(): Store<Reducer<{ app: any; }>, any> & { dispatch: any; } {
    return store;
}

export const mainstore = {
    init,
    getInstance
}