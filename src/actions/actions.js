import axios from 'axios'

// export function itemsHasErrored(bool) {
//     return {
//         type: 'ITEMS_HAS_ERRORED',
//         hasErrored: bool
//     };
// }

// export function itemsIsLoading(bool) {
//     return {
//         type: 'ITEMS_IS_LOADING',
//         isLoading: bool
//     };
// }

// export function itemsFetchDataSuccess(items) {
//     return {
//         type: 'ITEMS_FETCH_DATA_SUCCESS',
//         items
//     };
// }

export function usersFetchDataSuccess(users) {
    return {
        type: 'USERS_FETCH_DATA_SUCCESS',
        users
    };
}

// export function itemsFetchData(url) {
//     return (dispatch) => {
//         dispatch(itemsIsLoading(true));
//         return axios({
//             url: url,
//             timeout: 20000,
//             method: 'GET',
//             responseType: 'json'
//         }).then((response) => {
//                 dispatch(itemsIsLoading(false))
//                 return response.data;
//             }).then((items) => {
//                 dispatch(itemsFetchDataSuccess(items))

//             }).catch(() => dispatch(itemsHasErrored(true)));
//     };
// }

export function usersFetchData(url) {
    return (dispatch) => {
        
        return axios({
            url: url,
            timeout: 20000,
            method: 'GET',
            responseType: 'json'
        }).then((response) => {
                return response.data;
            }).then((users) => {
                dispatch(usersFetchDataSuccess(users))

            })
    };
}


export function ordersFetchData(url) {
    console.log('Inside action',url)
    return (dispatch) => {
        
        return axios({
            url: url,
            timeout: 20000,
            method: 'GET',
            responseType: 'json'
        }).then((response) => {
                return response.data;
            }).then((orders) => {
                dispatch(ordersFetchDataSuccess(orders))

            })
    };
}

export function ordersFetchDataSuccess(orders) {
    console.log('Inside action',orders)
    return {
        type: 'ORDERS_FETCH_DATA_SUCCESS',
        orders
    };
}

export function loginUser(user) {
  
    return {
        type: 'LOGIN_USER_SUCCESS',
        user
    };
}
