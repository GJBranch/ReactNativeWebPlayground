import 'react-native-gesture-handler';
import React from 'react';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { Header } from './components/header';
import { HomeScreen } from './screens/home';
import { FaqsScreen } from './screens/faqs';

import { Platform } from "react-native";

const stackNavOptions = {
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            headerTitle: 'Home?!',
        },
        path: 'home',
    },
    Faqs: {
        screen: FaqsScreen,
        navigationOptions: {
            headerTitle: 'FAQs?!',
        },
        path: 'faqs',
    },
}
const Stack = createStackNavigator();

export const AppRouter: React.FC<{}> = () => {
    const linking: LinkingOptions = {
        // prefixes: [], //needed for Android and iOS
        prefixes: ['https://localhost:8080', 'ro3://'],
        config: {
            screens: {
                Home: '/home',
                Faqs: '/faqs'
            }
        },
    };
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
        <>
            <NavigationContainer linking={linking}>
                <Header></Header>
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} options={screenStyles} />
                    <Stack.Screen name="Faqs" component={FaqsScreen} options={screenStyles} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
