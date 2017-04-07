import { combineReducers } from 'redux';
import { users, currentUser, orders } from './items';

export default combineReducers({
    users,
    currentUser,
    orders

});
