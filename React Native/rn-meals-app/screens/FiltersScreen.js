import React, { useEffect, useState, useCallback } from "react";
import { View, StyleSheet, Text, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/colors";
import { setFilters } from "../store/actions/meals";

const CustomSwitch = (props) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.title}</Text>
      <Switch
        value={props.value}
        thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
        trackColor={{ true: Colors.primaryColor, false: "#ccc" }}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = (props) => {
  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);
  const [isVegan, setIsVegan] = useState(false);

  const dispatch = useDispatch();
  const saveFilters = useCallback(() => {
   
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegetarian: isVegetarian,
      vegan: isVegan
    }
    dispatch(setFilters(appliedFilters));

  }, [isGlutenFree, isLactoseFree, isVegetarian, isVegan, dispatch]);

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Menu"
            iconName="ios-menu"
            onPress={() => {
              props.navigation.openDrawer();
            }}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Save"
            iconName="ios-save"
            onPress={() => {
              saveFilters();
            }}
          />
        </HeaderButtons>
      )
    });
  }, [props.navigation, saveFilters]);

  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Filters</Text>
      <CustomSwitch title="Gluten-free" value={isGlutenFree} onChange={() => setIsGlutenFree(!isGlutenFree)}/>
      <CustomSwitch title="Lactose-free" value={isLactoseFree} onChange={() => setIsLactoseFree(!isLactoseFree)}/>
      <CustomSwitch title="Vegetarian" value={isVegetarian} onChange={() => setIsVegetarian(!isVegetarian)}/>
      <CustomSwitch title="Vegan" value={isVegan} onChange={() => setIsVegan(!isVegan)}/>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 10
  },
});

export default FiltersScreen;
