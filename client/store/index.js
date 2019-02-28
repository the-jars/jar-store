import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import reducers to combine
import {categories} from './category'
import user from './user'
import shoppingCart from './cart'
import {singleProduct, allProducts} from './product'

const reducer = combineReducers({
  user,
  singleProduct,
  allProducts,
  categories,
  shoppingCart
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
