import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Platform, Platfrom } from "react-native";
import ProductOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";

const Stack = createStackNavigator();
const OrderStack = createStackNavigator();
const UserProductsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const defaultScreenConfig = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans",
  },
  gestureEnabled: true,
  gestureDirection: "horizontal",
};

const OrderStackNavigator = () => {
  return (
    <OrderStack.Navigator mode="modal" headerMode="float">
      <OrderStack.Screen
        name="Orders"
        component={OrdersScreen}
        options={defaultScreenConfig}
      />
    </OrderStack.Navigator>
  );
};

const UserProductsStackNavigator = () => {
  return (
    <UserProductsStack.Navigator mode="modal" headerMode="float">
      <UserProductsStack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={defaultScreenConfig}
      />
      <UserProductsStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={defaultScreenConfig}
      />
    </UserProductsStack.Navigator>
  );
};

const ShopStackNavigator = () => {
  return (
    <Stack.Navigator mode="modal" headerMode="float">
      <Stack.Screen
        name="ProductsOverview"
        component={ProductOverviewScreen}
        options={{ ...defaultScreenConfig, ...{ title: "Products" } }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={defaultScreenConfig}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={defaultScreenConfig}
      />
    </Stack.Navigator>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ShopStackNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrderStackNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="UserProducts"
        component={UserProductsStackNavigator}
        options={{
          drawerIcon: (drawerConfig) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={drawerConfig.color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
