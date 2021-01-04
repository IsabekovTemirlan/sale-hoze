import { GET_USERS, GET_USER_ADS, CLEAR_USERS, DELETE_USER_AD } from "../types";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload.reverse()

    case GET_USER_ADS:
      return action.payload

    case CLEAR_USERS:
      return []

    case DELETE_USER_AD:
      return state.filter((ad) => ad._id !== action.payload)

    default:
      return state
  }
}

export default usersReducer;