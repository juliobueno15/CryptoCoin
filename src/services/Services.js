import _ from "lodash";
const GLOBAL = require('../Constants');

const getCriptoList = _.debounce(() => {
    return fetch(GLOBAL.BASE_URL+'topList' , {
       method: 'GET',
       headers: {
         'Accept': 'application/json'
       }
     }) 
     .then((response) => response.json())
       .then((responseJson) => {
         console.log('the response is:', responseJson.data);
         return responseJson.data
      })
      // .catch(error => this.setState({ errorMessage: error.message }));
},300);

export default getCriptoList;