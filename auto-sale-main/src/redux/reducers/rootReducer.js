import {combineReducers} from 'redux'
import userReducer from './userReducer';
import carRducer from './carReducer';
import uiReducer from './uiReducer'

const rootReducer = combineReducers({
 user: userReducer,
 car: carRducer,
 ui: uiReducer
})

export default rootReducer;