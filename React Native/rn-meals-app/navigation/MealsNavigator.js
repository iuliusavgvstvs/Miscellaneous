import { Easing, Platform, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import Colors from "../constants/colors";
import FavouritesScreen from "../screens/FavoritesScreen";
import { NavigationContainer } from "@react-navigation/native";
import colors from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {createDrawerNavigator} from '@react-navigation/drawer'
import FiltersScreen from '../screens/FiltersScreen'


const animationConfig = {
  animation: "spring",
  config: {
    stiffness: 100,
    damping: 100,
    mass: 2,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const animationCloseConfig = {
  animation: "timing",
  config: {
    duration: 250,
    easing: Easing.linear,
  },
};

const defaultScreenConfig = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primaryColor : "",
  },  
  headerTitleStyle:{
    fontFamily:'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primaryColor,
  gestureEnabled: true,
  gestureDirection: "horizontal",
  transitionSpec: {
    open: animationConfig,
    close: animationCloseConfig,
  },
};


const Stack = createStackNavigator();
const createMealStackNavigator = () => {
  return (
    <Stack.Navigator mode="modal" headerMode="float">
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={defaultScreenConfig}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealScreen}
        options={defaultScreenConfig}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={defaultScreenConfig}
      />
    </Stack.Navigator>
  );
};

const FavStack = createStackNavigator();
const createFavStackNavigator = () => {
  return (
    <FavStack.Navigator mode="modal" headerMode="float">
      <FavStack.Screen name="Favourites" component={FavouritesScreen} options={{...defaultScreenConfig, ...{title:'Your favourites '}}}/>
      <FavStack.Screen name="MealDetail" component={MealDetailScreen} options={defaultScreenConfig}/>
    </FavStack.Navigator>
  );
};

const FilterStack = createStackNavigator();
const createFilterStackNavigator = () => {
  return(
    <FilterStack.Navigator mode="modal" headerMode="float">
      <FilterStack.Screen name= "Filters" component={FiltersScreen} options={defaultScreenConfig}/> 
    </FilterStack.Navigator>
  )
}

const Tab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();

const CreateMealsFavTabNavigator = () => {
  return (
      <Tab.Navigator
        activeColor="white"
        shifting={true}
        tabBarOptions={{
          activeTintColor: colors.accentColor,
          inactiveTintColor: "gray",
          labelStyle: {
            fontFamily: 'open-sans-bold'
          }
        }}
      >
        <Tab.Screen
          name="Meals"
          component={createMealStackNavigator}
          options={{
            tabBarIcon: ({ color }) => {
              return <Ionicons name="ios-restaurant" size={22} color={color} />;
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel:Platform.OS==='android'? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text>:'Meals'
          }}
        />
        <Tab.Screen
          name="Favourites"
          component={createFavStackNavigator}
          options={{
            tabBarIcon: ({ color }) => {
              return <Ionicons name="ios-star" size={22} color={color} />;
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS==='android'? <Text style={{fontFamily: 'open-sans-bold'}}>Favourites</Text> : 'Favourites'
          }}
        />
      </Tab.Navigator>
  );
};

const MainDrawer = createDrawerNavigator();
const MainNavigator = () => {
  return(
    <NavigationContainer>
      <MainDrawer.Navigator drawerContentOptions={{
        activeTintColor: Colors.accentColor,
        labelStyle: {
          fontFamily: 'open-sans-bold'
        }
      }}>
        <MainDrawer.Screen name="Meals" component={CreateMealsFavTabNavigator} />
        <MainDrawer.Screen name="Filters" component={createFilterStackNavigator} />
      </MainDrawer.Navigator>
    </NavigationContainer>
  );
};


export default MainNavigator;
