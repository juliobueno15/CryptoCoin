import React, { Fragment } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import SignUp from './src/screens/SignUp.js';
import Login from './src/screens/Login.js';
import CryptoCoinList from './src/screens/CryptoCoinList.js';

const SwitchNavigator = createSwitchNavigator(
  {
    SignUp: SignUp,
    Login: Login,
    CryptoCoinList: CryptoCoinList
  },
  {
    initialRouteName: 'Login',
    headerMode: 'none'
  }
)

const App = createAppContainer(SwitchNavigator);
export default App