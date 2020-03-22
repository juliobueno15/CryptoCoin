import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';
import { firebaseAuth } from '../../environment/firebase';

export default class Login extends React.Component {
state = { email: '', password: '', errorMessage: null }
handleLogin = () => {
  return fetch('http://10.0.2.2:5000/login' , {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
      'email': this.state.email,
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
       placeholder="Email"
       autoCapitalize="none"
       style={styles.textInput}
       onChangeText={email => this.setState({ email })}
       value={this.state.email}/>
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
     <Button
     title="Don't have an account? Sign Up" color="transparent"
     onPress={() => this.props.navigation.navigate('SignUp')}
     />
  </View>
)}
}
const heightConst = Dimensions.get('screen').height;
const styles = StyleSheet.create({
container: {
 height: heightConst - 50,
 justifyContent: 'center',
 alignItems: 'center',
 backgroundColor: '#fff'
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
 height: 40,
 width: '90%',
 borderColor: '#00000000',
 borderWidth: 1,
 marginTop: 8,
 color: '#fff'
},
loginBtn: {
 borderRadius: 5,
 marginBottom: 5,
 backgroundColor: 'transparent',
 borderWidth: 0,
 width: 100,
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
color: '#222',
textAlign: 'center'}
})