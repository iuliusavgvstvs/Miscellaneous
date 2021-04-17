import React, {useEffect} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import MealList from '../components/MealList'
import {MEALS} from "../data/test-data"
import CustomHeaderButton from "../components/CustomHeaderButton"
import {HeaderButtons, Item} from 'react-navigation-header-buttons'


const FavouritesScreen = props => {
  useEffect(() =>{
    props.navigation.setOptions({
      headerLeft: () =>
      <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={()=>{props.navigation.openDrawer()}}/>
      </HeaderButtons>
    })
  },[props.navigation])
  const favMeals = MEALS.filter(meal => meal.id==='m1' || meal.id==='m2')
  return (
    <MealList listData={favMeals} navigation={props.navigation}/>
  );
};

export default FavouritesScreen;

