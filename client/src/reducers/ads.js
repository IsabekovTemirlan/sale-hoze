const adReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_ADS":
      return action.payload.reverse()

    case "CLEARE_ADS":
      return []

    case "CREATE":
      return [...state, action.payload]

    case "LIKE":
      return state.map((ad) => (ad._id === action.payload._id ? action.payload : ad))

    case "DELETE":
      return state.filter((ad) => ad._id !== action.payload)

    case "UPDATE":
      return state.map((ad) => (ad._id === action.payload._id ? action.payload : ad));

    case "SEARCH_AD":
      return action.payload

    default :
      return state
  }
}

export default adReducer;