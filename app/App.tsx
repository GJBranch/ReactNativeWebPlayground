import * as React from 'react'
import { Provider } from 'react-redux';
import { mainstore as store } from './mainstore';
import { Text } from 'react-native';
const storeInstance = store.init();

const App = () => {
    return (
        <Provider store={storeInstance}>
            <Text>Something</Text>
            {/* <AppRouter /> */}
        </Provider>
    );
};

export default App;
