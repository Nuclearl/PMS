/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import Drawing from './src/Draw';
import BookList from './src/BooksList';
import DetailBook from "./src/DetailBook";
import BookAdd from "./src/BookAdd";
import Photo  from "./src/Photo";
import PhotoAdd from "./src/PhotoAdd";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { IconButton, Colors } from 'react-native-paper';
function General(props) {
  props.navigation.setOptions({})
  return (
    <View style={styles.center}>
      {["Комар Назар", "Група ІО-81", "ЗК ІО-8115"].map(function(object) {
        return <Text style={styles.center_text}>{object}</Text>;
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


function getHeader(route) {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case 'Drawing':
      return false;
    case 'General':
      return false;
    case 'BookList':
      return true;
    case 'Photo':
      return true;
  }
}
function getHeaderRight(route, navigation) {
  const routeName = getFocusedRouteNameFromRoute(route);

  switch (routeName) {
    case 'Drawing':
      return null;
    case 'General':
      return null;
    case 'BookList':
      return <IconButton
        icon="plus"
        color={Colors.lightBlueA700}
        size={35}
        onPress={() => navigation.navigate('BookAdd')}
      />;
    case 'Photo':
      return <IconButton
        icon="plus"
        color={Colors.lightBlueA700}
        size={35}
        onPress={() => PhotoAdd(navigation, route)}
      />;
  }
}

function TabGeneral({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({ headerShown: getHeader(route),
      headerTitle: "",
      headerRight: () => (
       getHeaderRight(route, navigation)
      ),
    });

  }, [navigation, route]);

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
        labelStyle: {
          fontSize: 20,
        },
      }}>
      <Tab.Screen name="General" component={General} />
      <Tab.Screen name="Drawing" component={Drawing} />
      <Tab.Screen name="BookList" component={BookList}/>
      <Tab.Screen name="Photo" component={Photo}/>
    </Tab.Navigator>
  );
}

const App: () => React$Node = () => {
  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{
          headerTitle: ""
        }}
      >
        <Stack.Screen  name="TabGeneral" component={TabGeneral} />
        <Stack.Screen name="DetailBook" component={DetailBook} />
        <Stack.Screen name="BookAdd" component={BookAdd} />
      </Stack.Navigator>
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
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 120
  }
});

export default App;
