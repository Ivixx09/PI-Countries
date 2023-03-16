import axios from "axios";

export function getAllCountries () {
  return async function (dispatch) {
    let data = await axios.get("/countries")
    return dispatch({
      type: "GET_ALL_COUNTRIES",
      payload: data.data
    })
  }
}
export function getAllActivities () {
  return async function (dispatch) {
    let data = await axios.get("/getActivities")
    return dispatch({
      type: "GET_ALL_ACTIVITIES",
      payload: data.data
    })
  }
}
export function getAllContinents () {
  return async function (dispatch) {
    const json = await axios.get("/getContinents")
    return dispatch({
      type: "GET_CONTINENTS",
      payload: json.data
    })
  }
}

export function findCountry (e) {
  return async function (dispatch) {
    const json = await axios.get(`/countries?name=${e}`)
    return dispatch({
      type: "GET_ONE_COUNTRY",
      payload: json.data
    }) 
  }
}

export function getCountryDetail (id) {
  return async function (dispatch) {
    const json = await axios.get(`/countries/${id}`)
    return dispatch({
      type: "GET_DETAILS",
        payload: json.data
    })
  }
}

export function cleanDetail () {
  return function (dispatch) {
    return dispatch({
      type: "CLEAN",
      payload: []
    })
  }
}

export function createActivity (payload) {
  return async function () {
    console.log("consologueo dessde las actions", payload)
    const json = await axios.post("/activities", payload)
    return json;
  }
}

// ************* FILTERS **********
export function ordeningNameAsc () {
  return async function (dispatch) {
    let json = await axios.get("/filterByNameAsc")
    return dispatch({
      type: "GET_COUNTRIES_ASC",
      payload: json.data
    })
  }
}
export function ordeningNameDesc () {
  return async function (dispatch) {
    let json = await axios.get("/filterByNameDesc")
    return dispatch({
      type: "GET_COUNTRIES_DESC",
      payload: json.data
    })
  }
}
export function ordeningPopAsc () {
  return async function (dispatch) {
    let json = await axios.get("/filterByPopulationAsc")
    return dispatch({
      type: "GET_COUNTRIES_POP_ASC",
      payload: json.data
    })
  }
}
export function ordeningPopDesc () {
  return async function (dispatch) {
    let json = await axios.get("/filterByPopulationDesc")
    return dispatch({
      type: "GET_COUNTRIES_POP_DESC",
      payload: json.data
    })
  }
}
export function filterByContinent (c) {
  return async function (dispatch) {
    let json =  await axios.get(`/filterByContinent?continentName=${c}`)
    return dispatch({
      type: "GET_COOUNTRIES_BY_CONTINENT",
      payload: json.data
    })
  }
}
export function filterByActivity (e) {
  return async function (dispatch) {
    let json = await axios.get(`/filterByActivity?act=${e}`)
    return dispatch({
      type: "GET_COUNTRIES_BY_ACTIVITIES",
      payload: json.data
    })
  }
}


