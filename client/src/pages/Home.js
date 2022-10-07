import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import decode from 'jwt-decode'

import styles from './Home.module.css'

import Auth from '../utils/Auth'
import UserCard from '../components/UserCard';
import PostForm from '../components/PostForm';
import axios from 'axios';
import Nav from '../components/Nav';

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

        // clear form values
        setPostState({
          title: '',
          body: '',
        });
    }

    return (
        <main>
            {!Auth.isLoggedIn(cookies.token) ?
             <>
                <Nav/>
                <Link to="/signup" className="fw-bold">Register</Link>/<Link to="/login" className="fw-bold">Login</Link>
                
             </>
            : 
            <div id={styles.main}>
                <Nav/>
                <div id={styles.content} className='p-4'>
                    <div id={styles.block} className="d-flex flex-column align-items-center">

                        <form id={styles.form} onSubmit={submitPost} className="d-flex flex-column justify-space-between align-items-center text-center mx-5">
                            <label htmlFor='title'>Title: </label>
                            <input 
                                onChange={handleChange} 
                                value={postState.title} 
                                id={styles.titleInput}
                                name='title' 
                                type="text" 
                            />

                            <label htmlFor='body'>Body: </label>
                            <textarea 
                                onChange={handleChange} 
                                value={postState.body}
                                id={styles.bodyInput}
                                name='body' 
                                type="text" 
                            />

                            <button id={styles.postButton} type="submit">submit</button>
                        </form>

                    </div>
                    <div id={styles.midBlock} className='text-center'>
                        ooo
                    </div>
                    <div id={styles.block} className="d-flex flex-column align-items-center">

                    </div>
                </div>
            </div> }
        </main>
    )
}

export default Home;