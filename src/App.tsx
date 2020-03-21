import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
              <Text>My Movies App</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </NavigationContainer>
    </>
  );
};

export default App;
