import {combineReducers} from 'redux';

import posts from './post'
import regions from './regions'
import selectPost from './viewPost'

const rootReducers = combineReducers({
    posts,
    regions,
    selectPost
})

export default rootReducers;