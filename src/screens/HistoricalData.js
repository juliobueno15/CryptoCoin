import React, { Component } from "react";
import { Alert, FlatList, Platform, Image, View, Text, StyleSheet, Button , TouchableOpacity} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";
import _ from "lodash";

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

  return fetch('http://10.0.2.2:5000/historical' , {
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

coinDate = (date,price) =>{
  return (
    <TouchableOpacity onPress={() => console.log("pressed")}>
      <View style={styles.item}>
        <Text style={styles.name}>{date}</Text>
        <Text style={styles.price}>Price: {price}</Text>
      </View>
    </TouchableOpacity>
  );
}

cryptoCoinHistorical = () => {
  return (
    <View style={styles.container}>
      <FlatList
          data={this.state.coinDate}
          renderItem={({ item }) => this.coinDate(item.date,item.close)}
          keyExtractor={item => item.date}
      />
    </View>
  )
}

render() {

const { currentUser } = this.state
  if(this.state.isLoading){
    return (
      <View style={styles.container}>
        <Text>is Loading</Text>
      </View>
      )
  }
  else{
    return this.cryptoCoinHistorical();
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