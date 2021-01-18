declare module 'combine-reducers' {
    import { Action, AnyAction, Reducer } from 'redux';

    export type RootReducer = Reducer<RootState, AnyAction>;

    type ReducerCollection<S = any, A extends Action = Action, G = any> = {
        [K in keyof S]: ReducerWithGlobalState<S[K], A, G> | Reducer<S[K], A>
    };

    function combineReducers<S>(
        reducers: ReducerCollection<S, any, S>
    ): Reducer<S>;
    export default function combineReducers<S, A extends Action = AnyAction>(
        reducers: ReducerCollection<S, A, S>
    ): Reducer<S, A>;


}
