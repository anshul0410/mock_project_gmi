import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { usersFetchData } from '../actions/actions';
import {LoginComponent} from './login/Login.component';
import css from '../styles/common.css';

const mapStateToProps = (state) => {
    // console.log(state,'drtdr')
    return {
        // items: state.items,
        // hasErrored: state.itemsHasErrored,
        // isLoading: state.itemsIsLoading,
        users: state.users,
        loginId: state.loginId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUsersData: (url) => dispatch(usersFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
