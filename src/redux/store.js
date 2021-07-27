import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../redux/root-reducer'

const middlewares = [thunkMiddleware]

const store = createStore(rootReducer, applyMiddleware(...middlewares))

export default store
