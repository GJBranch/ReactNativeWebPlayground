import timeoutMiddleware from '../../app/middleware/timeout';

jest.useFakeTimers();

const mockStore = {
    getState: () => jest.fn(),
    dispatch: () => jest.fn()
};

const mockNext = jest.fn();

describe('Timeout middleware tests', () => {
    test('action with delay param should invoke setTimeout 1s', () => {
        const mockAction = {
            delay: 1,
            type: 'TIMEOUT',
            callback: jest.fn()
        };
        timeoutMiddleware(mockStore)(mockNext)(mockAction);
        expect(setTimeout).toHaveBeenCalledTimes(1);
    });

    test('action with delay param should invoke callback after delay', () => {
        const mockAction = {
            delay: 1,
            type: 'TIMEOUT',
            callback: jest.fn()
        };
        timeoutMiddleware(mockStore)(mockNext)(mockAction);
        jest.runAllTimers();
        expect(mockAction.callback).toHaveBeenCalledTimes(1);
    });

    test('action with delay param should invoke callback after delay with getState and dispatch param', () => {
        const mockAction = {
            delay: 1,
            type: 'TIMEOUT',
            callback: jest.fn()
        };
        timeoutMiddleware(mockStore)(mockNext)(mockAction);
        jest.runAllTimers();
        expect(mockAction.callback).toHaveBeenCalledWith({
            ...mockStore
        });
    });

    test('action with delay param should not invoke callback after delay if timer is cleared', () => {
        const mockAction = {
            delay: 1,
            type: 'TIMEOUT',
            callback: jest.fn()
        };
        const clearTimer = timeoutMiddleware(mockStore)(mockNext)(mockAction);
        clearTimer();
        jest.runAllTimers();
        expect(mockAction.callback).toHaveBeenCalledTimes(0);
    });
});
