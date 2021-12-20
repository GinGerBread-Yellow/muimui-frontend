import {Component, useEffect} from 'react';
import {withRouter} from 'react-router-dom';

function checkLogin() {
    useEffect(()=> {
        const res = await axiosCheckLogin();
        if (!res) {
            history.push('./login');
        }
    })
    return null;
}

export default checkLogin;