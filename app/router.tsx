import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from './screens/home';
import { FaqsScreen } from './screens/faqs';

const Stack = createStackNavigator();

export const AppRouter: React.FC<{}> = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Faqs" component={FaqsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
