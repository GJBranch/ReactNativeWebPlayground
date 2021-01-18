import importMiddleware from '../../src/middleware/import';

const mockStore = {
    getState: () => jest.fn(),
    dispatch: () => jest.fn()
};
const mockNext = jest.fn();

describe('promise middleware test', () => {
    test('with import', (done) => {
        const mockAction = {
            import: {
                'test': () => Promise.resolve('test-resp')
            },
            callback: jest.fn()
        };

        importMiddleware(mockStore)(mockNext)(mockAction).then(() => {
            expect(mockNext).toHaveBeenCalledTimes(1);
            expect(mockNext).toHaveBeenNthCalledWith(1, {
                ...mockAction
            });
            expect(mockAction.importResp).toStrictEqual({test: 'test-resp'});
            done();
        });
    });

    test('without import', () => {
        const mockAction = {
            callback: jest.fn()
        };

        importMiddleware(mockStore)(mockNext)(mockAction);
        expect(mockNext).toHaveBeenCalledTimes(1);
        expect(mockNext).toHaveBeenNthCalledWith(1, mockAction);
    });
});
