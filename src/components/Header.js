import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


const Header = (title,page,properties) =>{
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.back} onPress={() => properties.navigation.navigate(page)}>
        <Icon name="angle-left" style={styles.icon} size={30} color="#000" /> 
        <Text style={styles.headerText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'#cccccc',
    justifyContent: 'center'
  },
  headerText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    letterSpacing: 1,
  },
  back: {
    flexDirection: 'row',
    position: 'absolute',
    left: '5%',
    alignItems: 'center'
    
  },
  icon:{
    right: 10  
  }
});


export default Header;