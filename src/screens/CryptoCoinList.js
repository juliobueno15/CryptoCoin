import React, { Component } from "react";
import { Alert, FlatList, Platform, Image, View, Text, StyleSheet, Button } from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import _ from "lodash";

export default class CryptoCoinList extends React.Component {
constructor(props) {
        super(props);
        this.state = { 
          currentUser: null,
          errorMessage: null,
          criptoTopList : null,
          criptoList: null,
          isLoading: true,
          query: null
        }
 }

componentDidMount() {
        const { currentUser } = firebaseAuth;
        this.setState({ currentUser })
    }
    
onPressButton = () => {
console.log('PressButton')
  firebaseAuth.signOut()
  .then(() => this.props.navigation.navigate('Login'))
  .catch(error => this.setState({ errorMessage: error.message }));
}

componentDidMount(){
  this.getCriptoList();
}

getCriptoList = _.debounce(() => {
  return fetch('http://10.0.2.2:5000/topList' , {
     method: 'GET',
     headers: {
       'Accept': 'application/json'
     }
   }) 
   .then((response) => response.json())
     .then((responseJson) => {
       console.log('the response is:', responseJson.data);
       this.setState({
         criptoTopList : responseJson.data ,
         criptoList : responseJson.data,
         isLoading : false
       })
    })
    // .catch(error => this.setState({ errorMessage: error.message }));
  },300);

getSpecificCoin = _.debounce(() => {
  return fetch('http://10.0.2.2:5000/topList' , {
     method: 'GET',
     headers: {
       'Accept': 'application/json'
     }
   }) 
   .then((response) => response.json())
     .then((responseJson) => {
       console.log('the response is:', responseJson.data);
       this.setState({
         criptoList : responseJson.data ,
         isLoading : false
       })
    })
    // .catch(error => this.setState({ errorMessage: error.message }));
  },300);

Coin(name,price) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.title}>{price}</Text>
    </View>
  );
}

cryptoCoinList = () => {
  return (
    <View style={styles.container}>
      <FlatList
          ListHeaderComponent = {this.renderHeader}
          data={this.state.criptoList}
          renderItem={({ item }) => this.Coin(item.name,item.price)}
          keyExtractor={item => item.name}
      />
    </View>
  )
}

updateSearch = (search) =>{
  const formattedQuery = search.toLowerCase()
  const specificCoin = _.filter(this.state.criptoTopList, coin =>{
    if(coin.name.toLowerCase().includes(formattedQuery)){
      return true
      }
    else{
      return false
      }
   })
    this.setState({
      query : search,
      criptoList : specificCoin
    })
    if(specificCoin.length == 0){
      console.log("entrou aqui")
    }

  // this.setState({search}),()=>{
  //   if('' != query){
  //     this.state.criptoList = this.state.criptoTopList.filter( function(item){
  //       return item.name.includes(search);
  //     }).map(function({name,price}){
  //       return {name,price}
  //     });
  //   }; 
  // }
}


renderHeader = () => {
  return <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        editable = {true}
        value={this.setState}
        onChangeText={this.updateSearch}
  />
};

render() {
// this.cryptoCoinList()
const { currentUser } = this.state
  if(this.state.isLoading){
    return (
      <View style={styles.container}>
        <Text>is Loading</Text>
      </View>
      )
  }
  else{
    return this.cryptoCoinList();
    }
}
}
const styles = StyleSheet.create({
container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center'
},
coin: {
  flex: 1,
  margin : 10,
  justifyContent: 'center',
  alignItems: 'center',
  borderBottomWidth: 1,
  borderBottomColor: '#eee'
 },
 item: {
  backgroundColor: '#f9c2ff',
  padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,
},
title: {
  fontSize: 32,
}
})