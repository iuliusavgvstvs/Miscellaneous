import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import MealItem from "./MealItem";

const MealList = (props) => {
  const renderMealItem = (itemData) => {
    return (
      <MealItem
        title={itemData.item.title}
        image={itemData.item.imageURL}
        affordability={itemData.item.affordability}
        complexity={itemData.item.complexity}
        duration={itemData.item.duration}
        onSelect={() => {
          props.navigation.navigate("MealDetail", {
            mealId: itemData.item.id,
          });
        }}
      />
    );
  };

  return (
    <View style={styles.list}>
      <FlatList
        style={{ width: "100%" }}
        keyExtractor={(item, index) => item.id}
        data={props.listData}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MealList;
