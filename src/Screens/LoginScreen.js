import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../Colors/Colors';
import {windowWidth} from '../Utils/Dimensions/Dimensions';
import {FONTS} from '../Utils/Fonts/Fonts';
import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [isSecure, setIsSecure] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorValue, setErrorValue] = useState();

  loginUser = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('GiphyScreen');
      })
      .catch(error => {
        setErrorValue(error.code);
      });
  };
  return (
    <>
      <View style={styles.mainContainer}>
        <Image source={require('../Assets/logo.gif')} style={styles.logo} />
        <Text style={styles.text}>Login</Text>
        <View>
          <Text style={{color: COLORS.red}}>{errorValue}</Text>
        </View>
        <Text style={styles.titleText}>UserName / E-Mail</Text>
        <TextInput
          value={email}
          onChangeText={email => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="off"
          secureTextEntry={false}
          keyboardType="email-address"
          style={styles.textInputStyles}
        />
        <Text style={styles.titleText}>Password</Text>
        <View style={styles.textInputContainer}>
          <TextInput
            value={password}
            onChangeText={password => setPassword(password)}
            autoCapitalize="none"
            autoCompleteType="off"
            autoCorrect={false}
            keyboardType="default"
            secureTextEntry={isSecure}
            style={{
              color: COLORS.white,
              width: windowWidth * 0.7,
              height: 40,
            }}
          />
          <TouchableOpacity
            onPress={() => setIsSecure(!isSecure)}
            style={styles.iconContainer}>
            {isSecure ? (
              <Image
                source={require('../Assets/private.png')}
                style={styles.iconStyle}
              />
            ) : (
              <Image
                source={require('../Assets/view.png')}
                style={styles.iconStyle}
              />
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => loginUser()}
          disabled={email === '' && password === ''}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: windowWidth * 0.9,
    height: 100,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: FONTS.ubuntu,
    fontSize: 25,
    color: 'white',
    textAlign: 'left',
    width: windowWidth * 0.9,
    alignSelf: 'center',
    marginBottom: 20,
  },
  titleText: {
    fontFamily: FONTS.carter,
    color: 'white',
    marginBottom: 5,
    fontSize: 16,
  },
  textInputStyles: {
    borderWidth: 1,
    borderColor: 'white',
    width: windowWidth * 0.9,
    alignSelf: 'center',
    height: 40,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 20,
    color: COLORS.white,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth * 0.9,
    height: 40,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    marginBottom: 50,
    paddingLeft: 20,
  },
  iconContainer: {
    width: windowWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  buttonContainer: {
    width: windowWidth * 0.9,
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: COLORS.cyanGreen,
  },
  buttonText: {
    fontFamily: FONTS.ubuntu,
    fontSize: 20,
    color: COLORS.white,
  },
});

export default LoginScreen;
