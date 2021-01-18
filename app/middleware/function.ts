import { AnyAction, Middleware } from "redux";

const functionMiddleware: Middleware = store => next => (action: AnyAction) => {
    if (action.callback) {
        return action.callback({...store, ...action.importResp});
    }

    return next(action);
};

export default functionMiddleware;
