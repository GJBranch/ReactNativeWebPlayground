import { Middleware } from "redux";

function getImports(imports: any) {
    return Promise.all(Object.values(imports).map((importFn: any) => importFn()))
        .then((resp: any) => {
            return Object.keys(imports).reduce((result: any, key: string, index: number) => {
                result[key] = resp[index];
                return result;
            }, {});
        });
}

const importMiddleware: Middleware = () => next => (action: Ro3.Middlewares.IImportAction) => {
    if (action.import) {
        return getImports(action.import).then((importResp: any) => {
            action.importResp = importResp;
            return next(action);
        });
    }

    return next(action);
};

export default importMiddleware;
