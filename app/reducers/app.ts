import { APP_INIT_ERROR, APP_INIT_INPROGRESS, APP_INIT_SUCCESS } from '../actions/app';

const initialState = {
    inProgress: false,
    success: false,
    error: false
};

const reductions = {
    [APP_INIT_INPROGRESS]: (state) => ({ ...state, inProgress: true }),
    [APP_INIT_SUCCESS]: (state) => ({ ...state, success: true, inProgress: false }),
    [APP_INIT_ERROR]: (state, action) => ({ ...state, error: action.payload, inProgress: false }),
};

export const appReducer = (state = initialState, action) => {
    const reducer = reductions[action.type];

    if (reducer) {
        return reducer(state, action);
    }

    return initialState;
};