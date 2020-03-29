import React, { Component } from "react";
import { Alert, FlatList, Platform, Image, View, Text, StyleSheet, Button , ActivityIndicator, TouchableOpacity} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import _ from "lodash";
const GLOBAL = require('../Constants');
import Header from "../components/Header";


export default class HistoricalData extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          currentUser: null,
          errorMessage: null,
          coinDate: null,
          coin : this.props.navigation.state.params.coin,
          isLoading: true
        }
 }

componentDidMount(){
  this.getHistoricalDate(this.state.coin);
}

getHistoricalDate =_.debounce((criptoCoin) => {
  this.setState({ isLoading: true})

  return fetch(GLOBAL.BASE_URL+'historical' , {
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
          coinDate : responseJson.data,
          isLoading: false
        })
      }
      else{
        this.setState({ 
          errorMessage: "dados historicos nao encontrados",
          isLoading: false
        })
      }
    })
  },500);

coinDate = (date,high,low,open,close) =>{
  return (
    <TouchableOpacity onPress={() => console.log("pressed")}>
      <View style={styles.historicalDate}>
        <Text style={styles.name}>{date}</Text>
        <Text style={styles.price}>High: R${high}</Text>
        <Text style={styles.price}>Low: R${low}</Text>
        <Text style={styles.price}>Open: R${open}</Text>
        <Text style={styles.price}>Close: R${close}</Text>
      </View>
    </TouchableOpacity>
  );
}

cryptoCoinHistorical = () => {
  return (
    <>
    {Header("Historical Data (" + this.state.coin + ")","CryptoCoinList",this.props)}
    <View style={styles.container}>
      <FlatList
          data={this.state.coinDate}
          renderItem={({ item }) => this.coinDate(item.date,item.high,item.low,item.open,item.close)}
          keyExtractor={item => item.date}
          ListFooterComponent={this.renderFooter}
      />
    </View>
  </>
  )
}

renderFooter = () => {
  return (
    <View
      style={styles.footer}
    >
    </View>
  );
};

render() {

const { currentUser } = this.state
  if(this.state.isLoading){
    return (
      <>
        {Header("Historical Data (" + this.state.coin + ")","CryptoCoinList",this.props)}
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
    return this.cryptoCoinHistorical();
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
historicalDate: {
  width:'90%',
  marginVertical: '2%',
  marginHorizontal: '5%',
  padding: 10,
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#f9c2ff',
 },
 item: {
  backgroundColor: '#f9c2ff',
  padding: 20,
  borderRadius: 5,
  marginVertical: 10,
  marginHorizontal: 10,   
},
loading: {
  height:'100%',
  width:'100%',
  // justifyContent: 'center',
  // alignItems: 'center',
  backgroundColor: '#333',
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
  paddingVertical: 20
}
})