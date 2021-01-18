import * as React from 'react';
import { Provider } from 'react-redux';
import { mainstore as store } from './mainstore';
import { AppRouter } from './router';
const storeInstance = store.init();

const App = () => {
    return (
        <Provider store={storeInstance}>
            <AppRouter />
        </Provider>
    );
};

export default App;
