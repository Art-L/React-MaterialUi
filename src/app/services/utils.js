
import {get} from 'lodash'




const getPhonesByBrand = (brand, phones)=>{
  return  phones.filter(phone=>{
    return phone.brand.toLowerCase() === brand.toLowerCase()
    })
}

export default {
    getPhonesByBrand
}