const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_USERS":
      return action.payload.reverse()

    case "CLEAR_USERS":
      return []

    default:
      return state
  }
}

export default usersReducer;