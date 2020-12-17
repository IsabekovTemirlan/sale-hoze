const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_USERS":
    return action.payload.reverse()

    default:
      return state
  }
}

export default usersReducer;