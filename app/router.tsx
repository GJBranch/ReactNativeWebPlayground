import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import { HomeScreen } from './screens/home';
import { FaqsScreen } from './screens/faqs';

import { Platform } from "react-native";

const Stack = createStackNavigator();

export const AppRouter: React.FC<{}> = () => {
    const screenStyles: StackNavigationOptions = {
        cardStyle: Platform.select({
            web: {
                minHeight: '100vh',
                flex: 1
            },
            default: {}
        })
    };
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={screenStyles} />
                <Stack.Screen name="Faqs" component={FaqsScreen} options={screenStyles} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
