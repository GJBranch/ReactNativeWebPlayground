import React from 'react';
import { Button, Text, View } from 'react-native';

export const FaqsScreen = ({navigation}) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Faqs Screen</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')}/>
        </View>
    );
};