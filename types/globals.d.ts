
declare module 'colorado-cornerstones' {
}

declare namespace Ro3 {
    import { AnyAction, Store } from 'redux';
    /**
    *
    *
    * @export
    * @class TemporaryStorage
    * @implements {Ro3.Models.ITemporaryStorage}
    */
    export class TemporaryStorage implements Ro3.Models.ITemporaryStorage {
        constructor();

        public data: {};
        public getItem: () => string | undefined;
        public setItem: (key: string, value: string) => void;
        public removeItem: (key: string) => string;
        public clear: () => void;
    }

    export namespace Services {
        export interface IStore {
            init: () => Store<Reducer<{ app: any; }>, any> & { dispatch: any; };
            getInstance: () => Store<Reducer<{ app: any; }>, any> & { dispatch: any; };
        }
    }

    export namespace Middlewares {
        export interface IActionsListenerAction extends AnyAction {
            type: stptscring;
            selectorActions: string[];
            selectorFn?: (params?: any) => boolean;
            importResp?: any;
            callback?: (params?: any) => any;
        }

        export interface IFunctionAction extends AnyAction {
            type: string;
            importResp?: any;
            callback?: (params?: any) => any;
        }
        export interface IImportAction extends AnyAction {
            type: string;
            import?: any;
            importResp?: any;
            callback?: (params?: any) => any;
        }

        export interface IIntervalAction extends AnyAction {
            type: string;
            delay: number;
            callback: (params?: any) => any;
            import?: any;
            importResp?: any;
        }

        export interface IPromiseAction extends AnyAction {
            type: string;
            import?: any;
            importResp?: any;
            callback?: (params?: any) => any;
        }

        export interface ITimeoutAction extends AnyAction {
            type: string;
            delay: number;
            callback: (params?: any) => any;
            import?: any;
            importResp?: any;
        }
    }

    export namespace Models {
        export interface IStorageConfig {

        }

        export interface ITemporaryStorage {
            /**
             *
             *
             * @type {Object}
             * @memberOf ITemporaryStorage
             */
            data: Object;
            /**
             *
             * @param {string} key
             * @returns {JSON | undefined}
             * @memberOf ITemporaryStorage
             */
            getItem(key: string): string | undefined;
            /**
             *
             * @param {string} key
             * @param {string} value
             * @returns {void}
             * @memberOf ITemporaryStorage
             */
            setItem(key: string, value: string): void;
            /**
             *
             * @param {string} key
             * @returns {string}
             * @memberOf ITemporaryStorage
             */
            removeItem(key: string): string;
            /**
             *
             * @returns {void}
             * @memberOf ITemporaryStorage
             */
            clear(): void;
        }
    }

}