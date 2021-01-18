import { AnyAction, Middleware } from "redux";

const promiseMiddleware: Middleware = store => next => (action: AnyAction) => {
    if (action.promiseFn) {
        next({
            type: `${action.type}_INPROGRESS`
        });
        
        return action.promiseFn({ getState: store.getState, dispatch: store.dispatch, ...action.importResp }).then((resp: any) => {
            next({
                type: `${action.type}_SUCCESS`,
                payload: resp
            });
        }, (error: any) => {
            next({
                type: `${action.type}_ERROR`,
                payload: error
            });
            throw error;
        });
    }
    
    return next(action);
};

export default promiseMiddleware;
