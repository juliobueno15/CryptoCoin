import React from 'react'
import { Alert, Platform, Image, View, Text, StyleSheet, Button } from 'react-native';


export default class CryptoCoinList extends React.Component {
constructor(props) {
        super(props);
        this.state = { currentUser: null, errorMessage: null }
 }
onPressButton = () => {
 console.log('PressButton');
}
render() {
const { currentUser } = this.state
return (
<View style={styles.container}>
   <Text>
     Hi {currentUser && currentUser.email}!
    </Text>
 <View>
  <Button
   onPress={this.onPressButton}
   title="Sign Out"
   />
  </View>
</View>
)}
}
const styles = StyleSheet.create({
container: {
 flex: 1,
 justifyContent: 'center',
 alignItems: 'center'
}
})