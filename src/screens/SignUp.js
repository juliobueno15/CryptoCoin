import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';
import { firebaseAuth } from '../../environment/firebase';
const GLOBAL = require('../Constants');


export default class SignUp extends React.Component {
    state = { email: '',password: '', password: '', errorMessage: null }
    handleSignUp = () => {
        return fetch(GLOBAL.BASE_URL+'signUp' , {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
      'username': this.state.username,
      'email': this.state.email,
      'password': this.state.password
 })
   })
   .then((response) => response.json())
     .then((responseJson) => {
       console.log('the response is:', responseJson.signUp);
      if(responseJson.signUp){
        this.props.navigation.navigate('CryptoCoinList')
      }
      else{
        this.setState({ errorMessage: "usuario nao encontrado" })
      }
    })
    }
    render() {
        return (
    <View style={styles.container}>
       <View style={styles.headingSection}>
       </View>
       <Text style={styles.heading}>Sign Up</Text>
        {this.state.errorMessage &&
         <Text style={{ color: 'red' }}>
           {this.state.errorMessage}
         </Text>}
         <TextInput
          placeholder="Username"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          />
         <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          />
          <TextInput
           secureTextEntry
           placeholder="Password"
           autoCapitalize="none"
           style={styles.textInput}
           onChangeText={password => this.setState({ password })}
           value={this.state.password}
           />
            <TouchableOpacity onPress={this.handleSignUp}>
              <View style={styles.loginBtn}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
              <View style={styles.signUpBtn}>
                <Text style={styles.buttonText}>Already have an account? Login</Text>
              </View>
            </TouchableOpacity>
      </View>
        )
    }
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