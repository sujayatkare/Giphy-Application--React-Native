import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {windowWidth} from '../Utils/Dimensions/Dimensions';

import {FONTS} from '../Utils/Fonts/Fonts';
import {COLORS} from '../Colors/Colors';

const DetailViewScreen = ({route, navigation}) => {
  const {title, image, description} = route.params;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={styles.text}>Description</Text>
        {description === undefined ? null : (
          <View style={styles.subTextContainer}>
            <Text style={styles.subText}>{description.description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: COLORS.black,
    flexDirection: 'column',
    flex: 1,
  },
  titleContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.grey,
  },
  titleText: {
    color: COLORS.white,
    fontFamily: FONTS.carter,
    fontSize: 20,
  },
  imageContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: windowWidth * 0.8,
    height: 200,
  },
  text: {
    paddingTop: 30,
    fontFamily: FONTS.carter,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white,
    color: 'grey',
  },
  subTextContainer: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  subText: {
    fontFamily: FONTS.ubuntu,
    fontSize: 18,
    textAlign: 'justify',
    color: COLORS.white,
  },
});

export default DetailViewScreen;
