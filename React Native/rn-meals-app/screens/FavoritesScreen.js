import React, {useEffect} from 'react'
import MealList from '../components/MealList'
import CustomHeaderButton from "../components/CustomHeaderButton"
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {useSelector} from 'react-redux'
import { View, StyleSheet } from 'react-native'
import CustomTextComponent from '../components/CustomTextComponent'


const FavouritesScreen = props => {
  useEffect(() =>{
    props.navigation.setOptions({
      headerLeft: () =>
      <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={()=>{props.navigation.openDrawer()}}/>
      </HeaderButtons>
    })
  },[props.navigation])

  const availableMeals = useSelector(state => state.meals.favouriteMeals);
  if(availableMeals.length === 0 || !availableMeals){
    return(
      <View style={styles.content}>
        <CustomTextComponent>No favourite meals found. Start adding some!</CustomTextComponent>
      </View>
    )
  }
  return (
    <MealList listData={availableMeals} navigation={props.navigation}/>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FavouritesScreen;

