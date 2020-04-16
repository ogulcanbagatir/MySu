import { AsyncStorage, Platform } from 'react-native'

const BASE_URL = "https://www.sabanciuniv.edu/apps/test/"
const HEADERS = {
	'Content-Type': 'application/x-www-form-urlencoded',
}

const API = {

	//USER LOCAL CALLS
	makeHttpRequest: function (relativePath, method, params) {

    return fetch(BASE_URL + relativePath, 
      { 
        method: method, 
        headers: HEADERS, 
        body: params 
      })
      .then((response) => {
      return response.json()
    }).catch((e) => {
      return e
    })
	},


  //MYSU ENDOINTS
  getMenu: function (startDate, endDate) { 
    let urlPostfix = 
    "sdate=" + startDate +
    "&edate=" + endDate
		return this.makeHttpRequest('meal.php?' + urlPostfix, 'GET', null)
	},

};

export default API;