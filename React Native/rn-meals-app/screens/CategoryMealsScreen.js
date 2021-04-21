import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { CATEGORIES } from "../data/test-data";
import MealList from "../components/MealList";
import { StyleSheet, View } from "react-native";
import CustomTextComponent from "../components/CustomTextComponent";

const CategoryMealScreen = (props) => {
  const { categoryId } = props.route.params;
  const availableMeals = useSelector((state) => state.meals.filteredMeals);
  const displayedMeals = availableMeals.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );
  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
  useEffect(() => {
    props.navigation.setOptions({
      title: selectedCategory.title,
    });
  }, [props.navigation, selectedCategory]);

  if (displayedMeals.length === 0) {
    return (
      <View style={styles.content}>
        <CustomTextComponent>
          No meals found, maybe check your filters?
        </CustomTextComponent>
      </View>
    );
  }

  return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryMealScreen;
