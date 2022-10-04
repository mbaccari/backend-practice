import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import decode from 'jwt-decode'

import styles from './Home.module.css'

import Auth from '../utils/Auth'
import UserCard from '../components/UserCard';
import PostForm from '../components/PostForm';
import axios from 'axios';

const Home = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [decodedToken, setDecodedToken] = useState('');
    const [posts, setPosts] = useState([])
    useEffect(() => {
        if(!cookies.token) return;

        if(Auth.isTokenExpired(cookies.token)) {
            removeCookie('token',{path:'/'});
        } else if(Auth.isLoggedIn(cookies.token)) {
            setDecodedToken(Auth.decodeToken(cookies.token))
        }

    }, []);

    const [postState, setPostState] = useState({ title: '', body: '' });
    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setPostState({
        ...postState,
        [name]: value,
        });
    };

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

    const submitPost = async (event) => {
        event.preventDefault();
        if(!loggedIn()) return;
        const { title, body } = postState;
        axios({
            method: 'post',
            url: 'http://localhost:3080/api/posts/post',
            data: {
              title: title,
              body: body,
              user: decodedToken
            }
          }).then(res => {
            console.log(res)
          })
    }

    return (
        <main>
            {!Auth.isLoggedIn(cookies.token) ?
             `not logged in` 
            : 
            <>
                <form onSubmit={submitPost}>
                    <label htmlFor='title'>Title: </label>
                    <input 
                        onChange={handleChange} 
                        value={postState.title} 
                        name='title' 
                        type="text" 
                    />

                    <label htmlFor='body'>Body: </label>
                    <input 
                        onChange={handleChange} 
                        value={postState.body} 
                        name='body' 
                        type="text" 
                    />

                    <button type="submit">submit</button>
                </form>
            </> }
        </main>
    )
}

export default Home;