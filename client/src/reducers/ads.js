const adReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ADS":
      return action.payload

    case "CREATE":
      return [...state, action.payload]

    case "LIKE":
      return state.map((ad) => (ad._id === action.payload._id ? action.payload : ad))

    case "DELETE":
      return state.filter((ad) => ad._id !== action.payload)

    case "SEARCH_AD":
      return [...state.filter(ad => ad.title.toLowerCase().includes(action.payload.toLowerCase()))]

    default :
      return state
  }
}

export default adReducer;