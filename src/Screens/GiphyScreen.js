import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import auth from '@react-native-firebase/auth';

import {FONTS} from '../Utils/Fonts/Fonts';
import {COLORS} from '../Colors/Colors';
import {windowHeight, windowWidth} from '../Utils/Dimensions/Dimensions';
import DataDisplayScreen from './DataDisplayScreen';
import LoaderScreen from './Loader';
import PaginationScreen from './PaginationScreen';

const GiphyScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(null);
  const [totalCount, setTotalCount] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(10);

  const lastCountIndex = currentPage * countPerPage;
  const firstCountIndex = lastCountIndex - countPerPage;
  const currentItems = data.slice(firstCountIndex, lastCountIndex);

  useEffect(() => {
    auth().signInWithEmailAndPassword('abc@gmail.com', 'password');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const results = await axios('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: 'geY9MfwM0VuetzqDGT6ldrKi6BqSCOqZ',
            limit: 100,
          },
        });
        console.log(results.data);
        setData(results.data.data);
        setCount(results.data.pagination.count);
        setTotalCount(results.data.pagination.total_count);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 5000);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderError = () => {
    return (
      <>
        {isError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>
              Network Error: Please try after some time
            </Text>
          </View>
        ) : null}
      </>
    );
  };

  const handleSearch = text => {
    setSearch(text);
  };

  const handleClick = async event => {
    event.preventDefault();
    setIsError(false);
    setIsLoading(true);
    try {
      const results = await axios('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: 'geY9MfwM0VuetzqDGT6ldrKi6BqSCOqZ',
          q: search,
          limit: 1000,
        },
      });
      setData(results.data.data);
      setCount(results.data.pagination.count);
      setTotalCount(results.data.pagination.total_count);
    } catch (err) {
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    }
    setIsLoading(false);
  };

  const pageSelected = pageNumber => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      <View style={styles.mainContainer}>
        {renderError()}
        {isLoading === false ? (
          <>
            <View style={styles.textInputContainer}>
              <TextInput
                value={search}
                onChangeText={handleSearch}
                placeholder="Search GIF's"
                placeholderTextColor="#009688"
                textAlignVertical="center"
                style={styles.textInputStyles}
              />
              <TouchableOpacity onPress={handleClick}>
                <View style={styles.btnContainer}>
                  <Image
                    source={require('../Assets/search.png')}
                    style={styles.btn}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.textContainer}>
              <View style={styles.textInnerContainer}>
                <Text style={styles.headingText}>Count: </Text>
                <Text style={styles.subHeadingText}>{count}</Text>
              </View>
              <View
                style={[
                  styles.textInnerContainer,
                  {justifyContent: 'flex-end'},
                ]}>
                <Text style={styles.headingText}>Total Count: </Text>
                <Text style={styles.subHeadingText}>{totalCount}</Text>
              </View>
            </View>
            <View>
              <PaginationScreen
                pageSelected={pageSelected}
                currentPage={currentPage}
                countPerPage={countPerPage}
                totalCount={data.length}
              />
            </View>
            <DataDisplayScreen
              currentItems={currentItems}
              navigation={navigation}
            />
          </>
        ) : (
          <LoaderScreen />
        )}
      </View>
    </>
  );
};

export default GiphyScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  text: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  errorText: {
    color: COLORS.red,
    fontFamily: FONTS.carter,
    padding: 5,
    backgroundColor: COLORS.white,
    borderRadius: 10,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textInputStyles: {
    backgroundColor: COLORS.white,
    height: windowHeight / 20,
    width: windowWidth * 0.6,
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 20,
    fontFamily: FONTS.carter,
    padding: 0,
    paddingLeft: 10,
    color: COLORS.black,
  },
  btnContainer: {
    backgroundColor: COLORS.cyanGreen,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderRadius: 10,
  },
  btn: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.95,
    alignSelf: 'center',
    marginBottom: 20,
  },
  textInnerContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  subHeadingText: {
    fontFamily: FONTS.ubuntu,
    fontSize: 16,
    color: COLORS.white,
  },
  headingText: {
    fontFamily: FONTS.ubuntu,
    fontSize: 16,
    color: COLORS.grey,
  },
});
