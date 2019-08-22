import {SET_ERRORS, REMOVE_ERRORS, SET_LOADING, REMOVE_LOADING} from '../actionTypes'

const initState = {
  errors:{},
  isLoading:false
}

const uiReducer = (state = initState, action) => {

    if(action.type === SET_LOADING){
      return Object.assign({}, state, {
        isLoading: true
      })
    }

    if(action.type === REMOVE_LOADING){
      return Object.assign({}, state, {
        isLoading: false
      })
    }

    if(action.type === SET_ERRORS){
      return Object.assign({}, state, {
        errors: action.payload
      })
    }

    if(action.type === REMOVE_ERRORS){
      return Object.assign({}, state, {
        errors: ''
      })
    }

    return state;
}

export default uiReducer;