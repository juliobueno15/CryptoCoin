import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, Dimensions, TouchableOpacity } from 'react-native';
import { firebaseAuth } from '../../environment/firebase';

export default class SignUp extends React.Component {
    state = { email: '',password: '', password: '', errorMessage: null }
    handleSignUp = () => {
        return fetch('http://10.0.2.2:5000/signUp' , {
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
           <View style={styles.signupBtn}>
              <Text style={styles.buttonText}>Sign Up</Text>
           </View>
         </TouchableOpacity>
         <Button color="transparent"
         title="Already have an account? Login "
         onPress={() => this.props.navigation.navigate('Login')}
          />
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
        backgroundColor: '#111111'
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
        borderColor: '#fff',
        borderWidth: 1,
        marginTop: 8,
        color: '#fff'
    },
    signupBtn: {
        borderRadius: 5,
        marginBottom: 5,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#fff',
        width: 100,
        height: 35,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center'
    }
})