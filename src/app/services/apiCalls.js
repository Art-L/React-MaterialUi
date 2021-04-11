
import {isFunction} from 'lodash'


const getBrands = (ressHandler, errorHandler)=>{
    fetch('https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/brands.json')
      .then(res => res.json())
      .then(
        (result) => {
            if(isFunction(ressHandler)){
                ressHandler(result);
            }
        //   this.setState({
        //     isLoaded: true,
        //     brandsResponse: result
        //   });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            if(isFunction(errorHandler)){
                errorHandler(error);
            }
        //   this.setState({
        //     isLoaded: true,
        //     error
        //   });
        }
      )
}

const getPhones = (ressHandler, errorHandler)=>{
    fetch('https://raw.githubusercontent.com/TeliaSweden/frontend-interview-api/master/phones.json')
      .then(res => res.json())
      .then(
        (result) => {
            if(isFunction(ressHandler)){
                ressHandler(result);
            }
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
            if(isFunction(errorHandler)){
                errorHandler(error);
            }
        }
      )
}

export default {
    getBrands,
    getPhones
}