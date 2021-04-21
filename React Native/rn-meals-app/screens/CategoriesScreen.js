import React, {useEffect} from "react";
import {FlatList} from "react-native";
import { CATEGORIES } from "../data/test-data";
import CategoryGridTile from '../components/CategoryGridTile'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/CustomHeaderButton'

const CategoriesScreen = (props) => {

  useEffect(() =>{
    props.navigation.setOptions({
      headerLeft: () =>
      <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
        <Item title="Menu" iconName="ios-menu" onPress={()=>{props.navigation.openDrawer()}}/>
      </HeaderButtons>
    })
  },[props.navigation])

  const renderGridItem = (itemData) => {
    return (<CategoryGridTile title = {itemData.item.title} color={itemData.item.color} onSelect = {() => {
      props.navigation.navigate( "CategoryMeals", {
        categoryId: itemData.item.id
      });
    }} />)
  };

  return (
    <FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: "Meal Categories",
};

export default CategoriesScreen;