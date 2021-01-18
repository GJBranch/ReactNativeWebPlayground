import promiseMiddleware from '../../app/middleware/promise';

const mockStore = {
    getState: () => jest.fn(),
    dispatch: () => jest.fn()
};
const mockNext = jest.fn();
const mockSuccessPromiseFn = jest.fn(() => Promise.resolve(2));
const mockErrorPromiseFn = jest.fn(() => Promise.reject('error'));

describe('promise middleware test', () => {
    test('success test', (done) => {
        const mockAction = {
            type: 'FETCH_REQUEST',
            promiseFn: mockSuccessPromiseFn
        };

        promiseMiddleware(mockStore)(mockNext)(mockAction).then(() => {
            expect(mockNext).toHaveBeenCalledTimes(2);
            expect(mockNext).toHaveBeenNthCalledWith(1, {
                type: 'FETCH_REQUEST_INPROGRESS'
            });
            expect(mockNext).toHaveBeenNthCalledWith(2, {
                type: 'FETCH_REQUEST_SUCCESS',
                payload: 2
            });
            expect(mockSuccessPromiseFn).toHaveBeenCalledWith({
                ...mockStore
            });
            done();
        });
    });

    test('failure test', (done) => {
        const mockAction = {
            type: 'FETCH_REQUEST',
            promiseFn: mockErrorPromiseFn
        };

        promiseMiddleware(mockStore)(mockNext)(mockAction).catch(() => {
            expect(mockNext).toHaveBeenCalledTimes(2);
            expect(mockNext).toHaveBeenNthCalledWith(1, {
                type: 'FETCH_REQUEST_INPROGRESS'
            });
            expect(mockNext).toHaveBeenNthCalledWith(2, {
                type: 'FETCH_REQUEST_ERROR',
                payload: 'error'
            });
            expect(mockErrorPromiseFn).toHaveBeenCalledWith({
                ...mockStore
            });
            done();
        });
    });
});
