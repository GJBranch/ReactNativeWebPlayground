import waitForMiddleware from '../../src/middleware/waitFor';

const mockStore = {
    getState: jest.fn(() => false),
    dispatch: () => jest.fn()
};
const mockNext = jest.fn();

describe('waitFor middleware test', () => {
    test('it should return resolved promise', (done) => {
        const mockAction = {
            type: 'WAIT_FOR',
            selectorFn: jest.fn(() => true),
            callback: jest.fn()
        };

        waitForMiddleware(mockStore)(mockNext)(mockAction).then(() => {
            expect(mockAction.callback).toHaveBeenCalledTimes(1);
            expect(mockAction.callback).toHaveBeenCalledWith({
                ...mockStore,
                action: mockAction
            });
            done();
        });
    });

    test('it should return promise and resolve once selector function is successful', (done) => {
        const mockAction = {
            type: 'WAIT_FOR',
            selectorFn: ({ getState }) => getState(),
            callback: jest.fn()
        };
        const successStore = {
            getState: () => true,
            dispatch: jest.fn()
        };

        waitForMiddleware(mockStore)(mockNext)(mockAction).then(() => {
            expect(mockAction.callback).toHaveBeenCalledTimes(1);
            expect(mockAction.callback).toHaveBeenCalledWith({
                ...successStore,
                action: { type: 'TEST_REQUEST' }
            });
            done();
        });

        waitForMiddleware(successStore)(mockNext)({ type: 'TEST_REQUEST' });
    });
});
