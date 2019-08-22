import {LOGOUT_USER, AUTHENTICATE_USER, SET_USER, UPDATE_USER} from '../actionTypes'
const initState = {
  isLogged: false,
  errors:'',
  user:{}
}

const userReducer = (state = initState, action) => {

    if(action.type === UPDATE_USER){
      return Object.assign({}, state, {
        user: Object.assign(state.user, action.payload)
      })
    }

    if(action.type === SET_USER){
      return Object.assign({}, state, {
        user: action.payload
    })
    }

    if(action.type === AUTHENTICATE_USER){
      localStorage.setItem('FBIdToken', action.payload)
      return Object.assign({}, state, {
        isLogged:true
    })
    }

    if(action.type === LOGOUT_USER){
      localStorage.removeItem('FBIdToken')
      return Object.assign({}, state, {
        isLogged:false,
        user: {}
      })
    }

    return state;
}

export default userReducer;