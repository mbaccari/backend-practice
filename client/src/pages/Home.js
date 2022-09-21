import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

import styles from './Home.module.css'

import Auth from '../utils/Auth'

const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    const loggedIn = () => {
        if(!cookies.token) {
            console.log('no token')
            return false;
        } else if(Auth.isTokenExpired(cookies.token)) {
            console.log('expired token')
            removeCookie('token',{path:'/'});
            return false;
        } else if(Auth.isToken(cookies.token)) {
            console.log('token plus not expired makes me happy boi')
            return true;
        }
    }
    

    return (
        <main>
            {!loggedIn() ?
             `not logged in` 
            : 
             `logged in`}
        </main>
    )
}

export default Home;