import React, {useEffect} from "react";
import { View, StyleSheet, Text } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";

import { MEALS } from "../data/test-data";

const MealDetailScreen = (props) => {
  const {mealId} = props.route.params;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  useEffect(() =>{
    props.navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () =>
      <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
        <Item title="Favourite" iconName="ios-star" onPress={()=>{console.log('fav')}}/>
      </HeaderButtons>
    })
  },[props.navigation, selectedMeal])

  
  return (
    <View style={styles.screen}>
      <Text>{selectedMeal.title}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealDetailScreen;
