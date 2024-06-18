import {createStore, applyMiddleware, combineReducers} from 'redux';

import { thunk } from 'redux-thunk'
import packages_reducer from './packages_reducer';

const reducers=combineReducers({
    packages:packages_reducer
})

const store =createStore(reducers, applyMiddleware(thunk));

export default store;