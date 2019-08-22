import React from 'react'

const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export default function InputChecker(props) {
    let message = '';

    if(props.field === 'password'){
      if(props.value.length < 8 && props.value.length > 0){
          message = 'Password must contain at least 8 characters'
      }else{
        message = props.errorMessage;
      }
    }else if(props.field === 'email'){
      if(props.value.length > 0 && !props.value.match(regEx)){
        message = 'Invalid email'
     }else{
      message = props.errorMessage;
    }
    }
  
    return (
       <span className='input-check'>{message}</span>
    )
}
