import React, {useEffect} from "react";
import { View, StyleSheet, Text, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../../components/shop/CartItem";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";
import * as cartActions from '../../store/actions/cart'
import * as orderActions from '../../store/actions/order'

const CartScreen = (props) => {
  const cartTotalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => {
    const arrayItems = [];
    for (const key in state.cart.items) {
      const curentItem = state.cart.items[key];
      arrayItems.push({
        productId: key,
        productTitle: curentItem.productTitle,
        productPrice: curentItem.productPrice,
        quantity: curentItem.quantity,
        sum: curentItem.sum,
      });
    }
    return arrayItems.sort((a,b) => a.productId > b.productId ? 1 : -1);
  });

  useEffect(() =>{
    props.navigation.setOptions({
      title: "Your Cart"
    })
  }, [props.navigation])

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text>
        </Text>
        <Button
          title="Order now"
          color={Colors.accent}
          disabled={cartItems.length === 0}
          onPress={()=>{dispatch(orderActions.AddOrder(cartItems, cartTotalAmount))}}
        ></Button>
      </Card>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={(itemData) => (
          <CartItem
            quantity={itemData.item.quantity}
            title={itemData.item.productTitle}
            amount={itemData.item.sum}
            deletable={true}
            onRemove={() => {dispatch(cartActions.removeFromCart(itemData.item.productId))}}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
