const alertReducer = (state = {
  text: '',
  type: undefined
}, action) => {
  switch (action.type) {

    case "SET_ALERT":
      return action.payload

    default :
      return state
  }
}

export default alertReducer;