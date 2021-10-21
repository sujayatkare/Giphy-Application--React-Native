import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {COLORS} from '../Colors/Colors';
import {FONTS} from '../Utils/Fonts/Fonts';

const PaginationScreen = props => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(props.totalCount / props.countPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <>
      <View style={styles.mainContainer}>
        {pageNumber.map(number => {
          return (
            <TouchableOpacity onPress={() => props.pageSelected(number)}>
              <View key={number} style={styles.textContainer}>
                <Text style={styles.text}>{number}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  textContainer: {
    padding: 10,
    borderRadius: 5,
    width: 30,
    backgroundColor: COLORS.cyanGreen,
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
    fontFamily: FONTS.ubuntu,
  },
});

export default PaginationScreen;
