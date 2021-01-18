import { Middleware } from 'redux';
import { ActionTypes } from '../constants/actionTypes';
const callbacks: {} = {};

const forEveryMiddleware: Middleware = store => next => (action: Ro3.Middlewares.IActionsListenerAction) => {
    if (action.type === ActionTypes.ADD_ACTIONS_LISTENER) {
        const { importResp, ...actionParams } = action;
        const callback = {
            importResp,
            ...actionParams
        };
        action.selectorActions.forEach(selectorAction => {
            callbacks[selectorAction] = callbacks[selectorAction] || [];
            callbacks[selectorAction].push(callback);
        });
        return () => {
            action.selectorActions.forEach(selectorAction => {
                callbacks[selectorAction].slice(callbacks[selectorAction].indexOf(callback), 1);
            });
        };
    }

    const result = next(action);

    if (action.type && callbacks[action.type]) {
        processCallback({ ...store, action });
    }

    return result;
};

function processCallback(params: any): void {
    callbacks[params.action.type].forEach((pendingItem: Ro3.Middlewares.IActionsListenerAction) => {
        const { selectorFn, callback, importResp } = pendingItem;
        if (!selectorFn || selectorFn({ ...params, ...importResp })) {
            callback && callback({ ...params, ...importResp });
        }
    });
}

export default forEveryMiddleware;
