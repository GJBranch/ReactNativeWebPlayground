import { AnyAction, Middleware } from "redux";

let pendingCallbacks: any[] = [];

const waitForMiddleware: Middleware = store => next => (action: AnyAction) => {
    if (action.type === 'WAIT_FOR') {
        const deferred = defer();
        const {importResp, ...actionParams} = action;
        pendingCallbacks.push({
            importResp,
            ...actionParams,
            deferred
        });

        processCallback({ ...store, action });
        return deferred.promise;
    }

    const result = next(action);

    processCallback({ ...store, action });

    return result;
};

function processCallback(params: any) {
    pendingCallbacks = pendingCallbacks.filter((pendingItem) => {
        const {deferred, selectorFn, callback, importResp} = pendingItem;
        if (selectorFn({...params, ...importResp})) {
            deferred.resolve(callback({...params, ...importResp}));
            return false;
        }
        return true;
    });
}

interface IDeferred {
    promise?: Promise<unknown>,
    resolve?: (value?: unknown) => void,
    reject?: (reason?: unknown) => void
}
function defer() {
    const result: IDeferred = {};

    result.promise = new Promise((resolve, reject) => {
        result.resolve = resolve;
        result.reject = reject;
    });

    return result;
}

export default waitForMiddleware;
