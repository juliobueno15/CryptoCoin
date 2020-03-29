import React, { Component } from "react";
import { Alert, FlatList, Platform, Image, View, Text, StyleSheet, Button , TouchableOpacity, ActivityIndicator,} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import _ from "lodash";
import Header from "../components/Header";

const GLOBAL = require('../Constants');


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

componentDidMount(){
  this.getCriptoList();
}

getCriptoList = _.debounce(() => {
  return fetch(GLOBAL.BASE_URL+'topList' , {
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

getSpecificCoin =_.debounce((criptoCoin) => {
  this.setState({ isLoading: true})

  return fetch(GLOBAL.BASE_URL+'coinFullData' , {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
      'coin': criptoCoin
 })
   })
   .then((response) => response.json())
     .then((responseJson) => {
       console.log('the response is:', responseJson);
      if(responseJson.found){
        console.log(responseJson)
        this.setState({
          criptoList : responseJson.data,
          isLoading: false
        })
      }
      else{
        this.setState({ 
          errorMessage: "moeda nao encontrada",
          isLoading: false
        })
      }
    })
  },500);

Coin = (name,price) =>{
  return (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('HistoricalData', {
      coin: name 
    })}>
      <View style={styles.coin}>
      <Text style={styles.name}>Name: {name}</Text>
        <Text style={styles.price}>Price: {price}</Text>
      </View>
    </TouchableOpacity>
  );
}

cryptoCoinList = () => {
  return (
    <>
    {Header("Top List","Login",this.props)}
    <View style={styles.container}>
      <View style={styles.list}>
      <FlatList
          ListHeaderComponent = {this.renderHeader}
          data={this.state.criptoList}
          renderItem={({ item }) => this.Coin(item.name,item.price)}
          keyExtractor={item => item.name}
          refreshing = {this.state.isLoading}
          onRefresh = {() => this.getCriptoList()}
          ListFooterComponent={this.renderFooter}
      />
      </View>
    </View>
    </>

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
      console.log(search.toUpperCase());
      this.getSpecificCoin(search.toUpperCase())
    }
}        


renderHeader = () => {
  return <SearchBar
        placeholder="Digite a sigla da cripto moeda"
        lightTheme
        style={styles.searchBar}
        round
        editable = {true}
        value={this.state.query}
        onChangeText={this.updateSearch}
  />
};

renderFooter = () => {
  return (
    <View style={styles.footer}>
    </View>
  );
};

render() {

// const { currentUser } = this.state
  console.log("resetado")
  console.log(this.state)
  if(this.state.isLoading){
    return (
      <>
        {Header("Top List","Login",this.props)}
        <View style={styles.loading}>
        <FlatList
          ListHeaderComponent = {this.renderHeader}
        />
          <Text>is Loading</Text>
        </View>
      </>
      )
  }
  else{
    return this.cryptoCoinList();
    } 
  }
}
const styles = StyleSheet.create({
container: {
 height:'100%',
 width:'100%',
//  justifyContent: 'center',
//  alignItems: 'center',
 backgroundColor: '#333',
},
loading: {
  height:'100%',
  width:'100%',
  // justifyContent: 'center',
  // alignItems: 'center',
  backgroundColor: '#333',
 },
list:{
//  justifyContent: 'center',
//  alignItems: 'center'
},
searchBar:{
//  width:'90%',
},
coin: {
  width:'90%',
  marginVertical: '2%',
  marginHorizontal: '5%',
  padding: 10,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#4be3c2',
 },
name: {
  fontSize: 25,
},
fullName: {
  fontSize: 20,
},
price: {
  fontSize: 28,
},
footer:{
  paddingVertical: 30
}
})