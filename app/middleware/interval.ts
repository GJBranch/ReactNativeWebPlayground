import { AnyAction, Middleware } from "redux";

const intervalMiddleware: Middleware = store => next => (action: AnyAction) => {
    if (action.type === 'INTERVAL') {
        const timerId: number = setInterval(() => action.callback({...store, ...action.importResp}), action.delay);
        return function cancel() {
            clearInterval(timerId);
        };
    }
    return next(action);
};

export default intervalMiddleware;
