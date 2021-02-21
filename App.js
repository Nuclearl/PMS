/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Drawing from './src/Draw';

function General() {
  return (
    <View style={styles.center}>
      {["Комар Назар", "Група ІО-81", "ЗК ІО-8115"].map(function(object) {
        return <Text style={styles.center_text}>{object}</Text>;
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();


const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
          labelStyle: {
            fontSize: 20,
          },

        }}>
        <Tab.Screen
          name="General"
          component={General}
        />
        <Tab.Screen name="Drawing" component={Drawing} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  center_text: {
    textAlign: "center",
  },
  center: {
    justifyContent: 'center',
    alignItems: "center",
    flex: 1,
  },
});

export default App;
