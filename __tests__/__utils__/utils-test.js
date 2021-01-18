import utils from '../../app/utils/utils';

describe('Utils Tests', () => {
    test('Deep merging objects - 1', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { a: 3, c: 4 };
        const result = utils.deepMerge(obj1, obj2);
        expect(result).toEqual({ a: 3, b: 2, c: 4 });
    });

    test('Deep merging objects - 2', () => {
        const obj1 = { a: 1 };
        const obj2 = { a: 3, c: 4 };
        const result = utils.deepMerge(obj2, obj1);
        expect(result).toEqual({ a: 1, c: 4 });
    });

    test('Deep merging objects that have a property with array type', () => {
        const obj1 = { a: 1, b: [2, 3, 'a'] };
        const obj2 = { b: [4, 'b', 5] };
        const result = utils.deepMerge(obj1, obj2);
        expect(result).toEqual({ a: 1, b: [4, 'b', 5] });
    });

    test('Deep merging nested objects', () => {
        const obj1 = {
            a: {
                b: {
                    c: {
                        d: {
                            e: 1000000,
                            f: {
                                g: 3800000
                            }
                        },
                        h: {
                            i: {
                                j: 16
                            }
                        },
                        l: {
                            m: 18,
                            n: 1
                        }
                    }
                }
            }
        };
        const obj2 = {
            a: {
                b: {
                    c: {
                        h: {
                            i: {
                                j: undefined,
                                k: true
                            }
                        },
                        l: {
                            m: 10,
                            n: 2
                        }
                    }
                }
            }
        };
        const result = utils.deepMerge(obj1, obj2);
        const expectedResult = {
            a: {
                b: {
                    c: {
                        d: {
                            e: 1000000,
                            f: {
                                g: 3800000
                            }
                        },
                        h: {
                            i: {
                                k: true
                            }
                        },
                        l: {
                            m: 18,
                            m: 10,
                            n: 2
                        }
                    }
                }
            }
        };
        
        expect(result).toEqual(expectedResult);
    });
});
