import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import decode from 'jwt-decode'

import styles from './Home.module.css'

import Auth from '../utils/Auth'
import UserCard from '../components/UserCard';

const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [decodedToken, setDecodedToken] = useState('')
    useEffect(() => {
        console.log(Auth.decodeToken(cookies.token))
        setDecodedToken(Auth.decodeToken(cookies.token))
      });

    const loggedIn = () => {
        if(!cookies.token) {
            return false;
        } else if(Auth.isTokenExpired(cookies.token)) {
            removeCookie('token',{path:'/'});
            return false;
        } else if(Auth.isToken(cookies.token)) {
            return true;
        }
    }
    return (
        <main>
            {!loggedIn() ?
             `not logged in` 
            : 
            <p>{decodedToken}</p> }
        </main>
    )
}

export default Home;