const alertReducer = (state = "", action) => {
  switch (action.type) {

    case "SET_ALERT":
      return action.payload

    default :
      return state
  }
}

export default alertReducer;