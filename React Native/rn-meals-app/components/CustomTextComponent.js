import React from 'react'
import {StyleSheet, Text} from 'react-native'

const CustomTextComponent = props => {
  return (
    <Text style={styles.text}>{props.children}</Text>
  );
};

const styles = StyleSheet.create({
  text:{
    fontFamily: 'open-sans',
  }
});

export default CustomTextComponent;