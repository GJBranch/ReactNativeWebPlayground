import React from 'react';
import { Button, Text, View } from 'react-native';
// import { Link } from '@react-navigation/native';

export const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen!</Text>
            {/* <Link to="/Faqs">FAQs Screen</Link> */}
            <Button title="FAQs" onPress={() => navigation.navigate('Faqs')}/>
            {/* <Button title="FAQs" onPress={() => navigation.navigate('Faqs')}/> */}
        </View>
    );
};