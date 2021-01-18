enum StorageLocations {
    LOCAL = 'LOCAL',
    SESSION = 'SESSION'
}

class TemporaryStorage implements Ro3.Models.ITemporaryStorage {
    public data: any = {};
    constructor() {
    }

    public getItem(key: string) : string | undefined {
        return this.data[key];
    }

    public setItem(key: string, value: string) : void {
        this.data[key] = value;
    }

    public removeItem(key: string) : string {
        const val = this.data[key];
        delete this.data;
        return val;
    }

    public clear() : void {
        this.data = {};
    }
}

const storageConfig: Ro3.Models.IStorageConfig = {
    blah: {
        keyName: 'blah',
        location: StorageLocations.LOCAL
    }
};

let localStorage: Storage | TemporaryStorage, sessionStorage: Storage | TemporaryStorage;

export const setItem = (key: string, value: string) : void => {
    let keyName, location;
    const config = storageConfig[key];

    if (config) {
        location = config.location;
        keyName = config.keyName;
    } else {
        // No pre-defined key. Assume local storage
        location = StorageLocations.LOCAL;
        keyName = key;
    }

    try {
        if (location === StorageLocations.LOCAL) {
            localStorage.setItem(keyName, JSON.stringify(value));
        } else if (location === StorageLocations.SESSION) {
            sessionStorage.setItem(keyName, JSON.stringify(value));
        }
    } catch (ex) {
        return undefined;
    }
}

export const getItem = (key: string) : JSON | undefined => {
    let keyName, location;
    const config = storageConfig[key];

    if (config) {
        location = config.location;
        keyName = config.keyName;
    } else {
        // No pre-defined key. Assume local storage
        location = StorageLocations.LOCAL;
        keyName = key;
    }

    try {
        if (location === StorageLocations.LOCAL) {
            return JSON.parse((localStorage.getItem(keyName) as string));
        } else if (location === StorageLocations.SESSION) {
            return JSON.parse((sessionStorage.getItem(keyName) as string));
        }
    } catch (ex) {
        return undefined;
    }
}

function isLocalStorageSupported(): boolean {
    if (window.localStorage) {
        try {
            // Check for private mode (In Safari, local storage is not supported in prviate mode)
            window.localStorage.setItem('storageCheck', 'test');
            window.localStorage.removeItem('storageCheck');
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

function isSessionStorageSupported(): boolean {
    if (window.sessionStorage) {
        try {
            // Check for private mode (In Safari, session storage is not supported in prviate mode)
            window.sessionStorage.setItem('storageCheck', 'test');
            window.sessionStorage.removeItem('storageCheck');
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

function activate() {
    if (isLocalStorageSupported()) {
        localStorage = window.localStorage;
    } else {
        localStorage = new TemporaryStorage();
    }

    if (isSessionStorageSupported()) {
        sessionStorage = window.sessionStorage;
    } else {
        sessionStorage = new TemporaryStorage();
    }
}

activate();