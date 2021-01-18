import { Middleware } from 'redux';
import { ActionTypes } from '../constants/actionTypes';
const timeoutMiddleware: Middleware = store => next => (action: Ro3.Middlewares.ITimeoutAction) => {
    if (action.type === ActionTypes.TIMEOUT) {
        const timerId = setTimeout(() => action.callback({...store, ...action.importResp}), action.delay);
        return function cancel() {
            clearTimeout(timerId);
        };
    }

    return next(action);
};

export default timeoutMiddleware;
