import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from './Components/Home';
import Search from './Components/Search';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
              screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Current City') {
              iconName = focused
                ? 'md-cloud'
                : 'ios-home';
            } else if (route.name === 'Select City') {
              iconName = focused ? 'ios-list' : 'ios-search';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
        >
        <Tab.Screen name="Current City" component={Home} />
        <Tab.Screen name="Select City" component={Search} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}