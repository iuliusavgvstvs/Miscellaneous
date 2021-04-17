import React, {useEffect} from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MealItem from "../components/MealItem";
import { CATEGORIES, MEALS } from "../data/test-data";
import MealList from "../components/MealList"

const CategoryMealScreen = (props) => {

  const {categoryId} = props.route.params;
  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );
  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
  useEffect(() =>{
    props.navigation.setOptions({
      title: selectedCategory.title
    })
  },[props.navigation, selectedCategory])  
  return (
    <MealList listData={displayedMeals} navigation = {props.navigation}/>
  );
};

CategoryMealScreen.navigationOptions = navigationData => {
  const catId = navigationData.navigation.getParam('categoryId');

  const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

  return {
    headerTitle: selectedCategory.title
  };
};

export default CategoryMealScreen;
