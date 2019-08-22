import {SET_ERRORS, REMOVE_ERRORS,SET_USER, SET_LOADING, REMOVE_LOADING, AUTHENTICATE_USER, UPDATE_USER, LOGOUT_USER} from '../actionTypes'
import axios from 'axios'
import jwtDecode from "jwt-decode";
export const loginUser = (payload) => (dispatch) => {
   dispatch({
       type: SET_LOADING
   })
   axios.post('/signIn', {
       email: payload.email,
       password: payload.password
   })
   .then((data)=>{
     dispatch({
         type: REMOVE_ERRORS
     })
     dispatch({
         type:AUTHENTICATE_USER,
         payload: data.data.token
     })
     dispatch({
         type:REMOVE_LOADING
     })
     const token = localStorage.FBIdToken;
     const decodedToken = jwtDecode(token);
     axios.get(`/getUser?email=${decodedToken.email}`)
      .then((data)=>{
        dispatch({
          type:SET_USER, 
          payload:data.data})
      })
     payload.history.push('/profile')
   })
   .catch(e=>{
       dispatch({
           type: SET_ERRORS,
           payload: e.response.data
       })
       dispatch({
        type:REMOVE_LOADING
    })
   })
 
}

export const updateUser = (payload) => (dispatch) => {
    dispatch({type:SET_LOADING});
    axios.post('/changeUserInfo', payload.user)
    .then(()=>{
        dispatch({type:UPDATE_USER, payload:payload.user})
        dispatch({type:REMOVE_LOADING})
        dispatch({type:REMOVE_ERRORS})
        payload.history.push('/profile')
    })
    .catch(e=>{
        dispatch({type: REMOVE_LOADING})
        dispatch({type:SET_ERRORS, payload:e.response.data})
    })
}

export const signupUser = (payload) => (dispatch) => {
    dispatch({type:SET_LOADING})
    axios.post('/signUp', {
        email: payload.email,
        password: payload.password,
        confirmPassword: payload.confirmPassword
    })

    .then((data)=>{
        dispatch({
            type: REMOVE_ERRORS
        })
        dispatch({
            type:AUTHENTICATE_USER,
            payload: data.data.token
        })
        dispatch({
            type:REMOVE_LOADING
        })
        const token = localStorage.FBIdToken;
     const decodedToken = jwtDecode(token);
     axios.get(`/getUser?email=${decodedToken.email}`)
      .then((data)=>{
        dispatch({
          type:SET_USER, 
          payload:data.data})
      })
        payload.history.push('/profile')
      })
   
    .catch(e=>{
        dispatch({type:SET_ERRORS,payload:e.response.data})
        dispatch({type:REMOVE_LOADING})
    })
}

export const logoutUser = () => (dispatch) => {
    dispatch({type:LOGOUT_USER})
    window.location.href='/'
}
