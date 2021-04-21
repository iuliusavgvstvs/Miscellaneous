import React, { useEffect, useCallback } from "react";
import { View, StyleSheet, Text, ScrollView, Image } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import CustomTextComponent from "../components/CustomTextComponent";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavourite } from "../store/actions/meals";

const ListItem = (props) => {
  return (
    <View style={styles.listItem}>
      <CustomTextComponent>{props.children}</CustomTextComponent>
    </View>
  );
};

const MealDetailScreen = (props) => {
  const { mealId } = props.route.params;
  const availableMeals = useSelector((state) => state.meals.meals);
  const IsFavourite = useSelector((state) =>
    state.meals.favouriteMeals.some((meal) => meal.id === mealId)
  );
  const selectedMeal = availableMeals.find((meal) => meal.id === mealId);
  const dispatch = useDispatch();
  const toggleFavouriteHandler = useCallback(() => {
    dispatch(toggleFavourite(mealId));
  }, [dispatch, mealId]);

  useEffect(() => {
    props.navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Favourite"
            iconName={IsFavourite ? "ios-star" : "ios-star-outline"}
            onPress={toggleFavouriteHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation, selectedMeal, IsFavourite]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageURL }} style={styles.image} />
      <View style={styles.details}>
        <CustomTextComponent>{selectedMeal.duration}m</CustomTextComponent>
        <CustomTextComponent>
          {selectedMeal.complexity.toUpperCase()}
        </CustomTextComponent>
        <CustomTextComponent>
          {selectedMeal.affordability.toUpperCase()}
        </CustomTextComponent>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {selectedMeal.ingredients.map((ingredient) => (
        <ListItem key={ingredient}>{ingredient}</ListItem>
      ))}
      <Text style={styles.title}>Steps</Text>
      {selectedMeal.steps.map((step) => (
        <ListItem key={step}>{step}</ListItem>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
});

export default MealDetailScreen;
