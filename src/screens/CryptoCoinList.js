import React, { Component } from "react";
import { Alert, FlatList, Platform, Image, View, Text, StyleSheet, Button , TouchableOpacity} from 'react-native';
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

getSpecificCoin =_.debounce((criptoCoin) => {
  this.setState({ isLoading: true})

  return fetch('http://10.0.2.2:5000/coinFullData' , {
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
      <View style={styles.item}>
      <Text style={styles.name}>Name: {name}</Text>
        <Text style={styles.price}>Price: {price}</Text>
      </View>
    </TouchableOpacity>
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
      console.log(search.toUpperCase());
      this.getSpecificCoin(search.toUpperCase())
    }
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
 alignItems: 'center',
 backgroundColor: '#333',
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
  borderRadius: 5,
  marginVertical: 10,
  marginHorizontal: 10,   
},
name: {
  fontSize: 25,
},
fullName: {
  fontSize: 20,
},
price: {
  fontSize: 28,
}
})