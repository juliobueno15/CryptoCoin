import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';

const GLOBAL = require('../Constants');


export default class Login extends React.Component {
state = { username: '', password: '', errorMessage: null }
handleLogin = () => {
  return fetch(GLOBAL.BASE_URL+'login' , {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
      'username': this.state.username,
      'password': this.state.password
 })
   })
   .then((response) => response.json())
     .then((responseJson) => {
       console.log('the response is:', responseJson.login);
      if(responseJson.login){
        this.props.navigation.navigate('CryptoCoinList')
      }
      else{
        this.setState({ errorMessage: "usuario nao encontrado" })
      }
    })
    // firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
    // .then(() => this.props.navigation.navigate('CryptoCoinList'))
    // .catch(error => this.setState({ errorMessage: error.message }));
  };

render() {

return (
   <View style={styles.container}>
    <View style={styles.headingSection}>
    </View>
     <Text style={styles.heading}>Login</Text>
     {this.state.errorMessage &&
      <Text style={{ color: 'red' }}>
       {this.state.errorMessage}
       </Text>}
       <TextInput
       placeholder="Username"
       autoCapitalize="none"
       style={styles.textInput}
       onChangeText={username => this.setState({ username })}
       value={this.state.username}/>
       <TextInput
       secureTextEntry
       placeholder="Password"
       autoCapitalize="none"
       style={styles.textInput}
       onChangeText={password => this.setState({ password })}
       value={this.state.password}/>
      <TouchableOpacity onPress={this.handleLogin}>
        <View style={styles.loginBtn}>
          <Text style={styles.buttonText}>Log In</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUp')}>
        <View style={styles.signUpBtn}>
          <Text style={styles.buttonText}>Don't have an account? Sign Up</Text>
        </View>
      </TouchableOpacity>
  </View>
)}
}
const heightConst = Dimensions.get('screen').height;
const styles = StyleSheet.create({
container: {
 height: heightConst - 50,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#444444'
},
headingSection: {
 borderColor: 1,
 textAlign: 'center',
 alignItems: 'center',
 marginBottom: 35
},
heading: {
 color: '#fff',
 fontSize: 26,
 marginBottom: 10
}, 
textInput: {
 backgroundColor: '#ffffff',
 borderRadius: 5,
 height: 50,
 width: '90%',
 fontSize: 20,
 borderColor: '#00FFCC',
 borderWidth: 2,
 marginTop: 8,
 color: '#000'
},
loginBtn: {
 fontSize: 50,
 borderRadius: 5,
 marginBottom: 5,
 backgroundColor: 'transparent',
 borderWidth: 0,
 width: 150,
 height: 40,
 overflow: 'hidden',
 alignItems: 'center',
 justifyContent: 'center',
 marginTop: 10,
 shadowColor: 'rgba(0, 0, 0, 0.1)',
 shadowOpacity: 0.8,
 elevation: 6,
 shadowRadius: 15,
 shadowOffset : { width: 1, height: 13},
 backgroundColor: '#00FFCC' 
},
signUpBtn: {
  borderRadius: 5,
  marginBottom: 5,
  backgroundColor: 'transparent',
  borderWidth: 0,
  width: 250,
  height: 40,
  overflow: 'hidden',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 10,
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOpacity: 0.8,
  elevation: 6,
  shadowRadius: 15,
  shadowOffset : { width: 1, height: 13},
  backgroundColor: '#00FFCC' 
 },
buttonText: {
fontSize: 15,
color: '#222',
textAlign: 'center'}
})