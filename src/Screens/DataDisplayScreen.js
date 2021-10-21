import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
} from 'react-native';

import {windowWidth} from '../Utils/Dimensions/Dimensions';
import {FONTS} from '../Utils/Fonts/Fonts';
import {COLORS} from '../Colors/Colors';

const DataDisplayScreen = ({currentItems, navigation}) => {
  const [isfilled, setIsFilled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [favourite, setFavourite] = useState([]);

  const ToggleSnackBar = () => {
    setIsFilled(isfilled => !isfilled);
    setFavourite(currentItems.title);
    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };
  const onDismissSnackBar = () => {
    setVisible(false);
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentItems.map(el => {
          return (
            <>
              <View key={el.id} style={styles.mainContainer}>
                <View style={styles.titleContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('DetailViewScreen', {
                        title: el.title,
                        description: el.user,
                        image: el.images.fixed_height.url,
                      })
                    }>
                    <Text style={styles.titleText}>{el.title}</Text>
                  </TouchableOpacity>
                </View>
                <View style={{width: windowWidth * 0.1}}>
                  <TouchableOpacity onPress={() => ToggleSnackBar()}>
                    {isfilled === true ? (
                      <>
                        <Image
                          source={require('../Assets/heart_filled.png')}
                          style={{
                            width: 15,
                            height: 15,
                            resizeMode: 'contain',
                            tintColor: COLORS.red,
                          }}
                        />
                        <Modal
                          transparent={true}
                          animationType={'fade'}
                          visible={visible}>
                          <View style={styles.snackBarMainContainer}>
                            <Text style={styles.snackBarHeadingText}>
                              Added To Favourites
                            </Text>
                            <TouchableOpacity
                              onPress={() => onDismissSnackBar()}
                              style={styles.snackBarValueContainer}>
                              <Text style={styles.snackBarText}>Done</Text>
                            </TouchableOpacity>
                          </View>
                        </Modal>
                      </>
                    ) : (
                      <Image
                        source={require('../Assets/heart.png')}
                        style={{
                          width: 15,
                          height: 15,
                          resizeMode: 'contain',
                          tintColor: COLORS.white,
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={styles.iconContainer}>
                  <Image
                    source={require('../Assets/right-arrow.png')}
                    style={styles.icon}
                  />
                </View>
              </View>
            </>
          );
        })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderTopWidth: 1,
    borderColor: COLORS.white,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth * 1,
  },
  titleContainer: {
    width: windowWidth * 0.8,
  },
  titleText: {
    padding: 20,
    fontFamily: FONTS.caveat,
    fontSize: 20,
    color: COLORS.white,
  },
  iconContainer: {
    width: windowWidth * 0.1,
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    marginRight: 15,
  },
  snackBarMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 20,
    padding: 10,
    backgroundColor: COLORS.white,
    left: 20,
    right: 20,
    top: '40%',
    borderRadius: 10,
    position: 'absolute',
  },
  snackBarHeadingText: {
    textAlign: 'center',
    fontFamily: FONTS.ubuntu,
    color: COLORS.cyanGreen,
  },
  snackBarValueContainer: {
    paddingTop: 4,
    paddingBottom: 4,
    alignItems: 'center',
  },
  snackBarText: {
    textAlign: 'center',
    fontFamily: FONTS.ubuntu,
    color: COLORS.black,
  },
});

export default DataDisplayScreen;