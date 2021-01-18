import * as React from 'react'
import { Provider } from 'react-redux';
import { mainstore as store } from './mainstore';

const storeInstance = store.init();

const App = () => {
    return (
        <Provider store={storeInstance}>
            <div>Hello World</div>
            {/* <AppRouter /> */}
        </Provider>
    );
};

export default App;
