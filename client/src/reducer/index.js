
const initialState = {
  countries : [],
  activities: [],
  continents:[],
  detail:[],
}

function rootReducer (state = initialState, action) {
  switch(action.type) {
    case "GET_ALL_COUNTRIES": 
      return{
        ...state,
        countries: action.payload
      }
    case "GET_DETAILS":
      return{
        ...state,
        detail: action.payload
      }
    case "GET_COUNTRIES_ASC":
      return {
        ...state,
        countries: action.payload
      }
      case "GET_COUNTRIES_DESC":
      return {
        ...state,
        countries: action.payload
      }
      case "GET_COUNTRIES_POP_ASC":
      return {
        ...state,
        countries: action.payload
      }
      case "GET_COUNTRIES_POP_DESC":
      return {
        ...state,
        countries: action.payload
      }
      case "GET_COOUNTRIES_BY_CONTINENT":
      return {
        ...state,
        countries: action.payload
      }
      case "GET_COUNTRIES_BY_ACTIVITIES":
      return {
        ...state,
        countries: action.payload
      }
      case "GET_ALL_ACTIVITIES":
        return{
          ...state,
          activities: action.payload
        }
      case "GET_CONTINENTS":
        return {
          ...state,
          continents: action.payload
        }
      case "GET_ONE_COUNTRY":
        return {
          ...state,
          countries: action.payload
        }
        case "POST_ACTIVITY":
          return {
            ...state,
        }
        case "CLEAN":
          return{
            ...state,
            detail: []
          }

      default: 
        return state; 
  }
}
export default rootReducer