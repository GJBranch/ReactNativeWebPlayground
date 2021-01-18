import functionMiddleware from '../../app/middleware/function';

jest.useFakeTimers();

const mockStore = {
    getState: () => jest.fn(),
    dispatch: () => jest.fn()
};

const mockNext = jest.fn();

describe('Function middleware tests', () => {
    test('action with callback param should invoke 1s', () => {
        const mockAction = {
            callback: jest.fn()
        };
        functionMiddleware(mockStore)(mockNext)(mockAction);
        expect(mockAction.callback).toHaveBeenCalledTimes(1);
    });

    test('action with callback param should invoke callback with dispatch and getState', () => {
        const mockAction = {
            callback: jest.fn()
        };
        functionMiddleware(mockStore)(mockNext)(mockAction);
        expect(mockAction.callback).toHaveBeenCalledWith({
            ...mockStore
        });
    });

    test('action without delay and callback should invoke next action', () => {
        const mockAction = {
            type: 'mock-type'
        };
        functionMiddleware(mockStore)(mockNext)(mockAction);
        expect(mockNext).toHaveBeenCalledTimes(1);
    });

    test('action without delay and callback should invoke next action with param', () => {
        const mockAction = {
            type: 'mock-type'
        };
        functionMiddleware(mockStore)(mockNext)(mockAction);
        expect(mockNext).toHaveBeenCalledWith(mockAction);
    });
});
