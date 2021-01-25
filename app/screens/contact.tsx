import React from 'react';
import { Button, Text, View } from 'react-native';

export const Contact = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Contact Us</Text>
            <Button title="Home" onPress={() => navigation.navigate('Home')}/>
        </View>
    );
};