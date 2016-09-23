const loggedin = (state = false, action) => {
  switch (action.type) {
  case 'TOGGLE_LOGGEDIN':
    return !state;
  default:
    return state;
  }
};

export default loggedin;
