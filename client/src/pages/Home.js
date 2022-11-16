import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

import styles from './Home.module.css'

import Auth from '../utils/Auth'
import axios from 'axios';
import Nav from '../components/Nav';
import PostCard from '../components/PostCard';

const Home = () => {
    const [cookies, removeCookie] = useCookies(['token']);
    const [decodedToken, setDecodedToken] = useState('');
    const [posts, setPosts] = useState(null)
    useEffect(() => {
        if(!cookies.token) return;

        if(Auth.isTokenExpired(cookies.token)) {
            removeCookie('token',{path:'/'});
        } else if(Auth.isLoggedIn(cookies.token)) {
            setDecodedToken(Auth.decodeToken(cookies.token))
            axios({
                method: 'get',
                url: 'http://localhost:3080/api/posts/'
              }).then(res => {
                if(res.data.length === 0) return;
                setPosts(res.data)
              }).catch(err => console.log(err))
        }

    }, [cookies.token, removeCookie]);

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
        event.preventDefault()
        if(!loggedIn()) return;
        const { title, body } = postState;
        axios({
            method: 'post',
            url: '/api/posts/post',
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

    
    const form = document.querySelector('[data-id="form"]');
    const postBlock = document.querySelector('[data-id="posts"]');
    const profile = document.querySelector('[data-id="profile"]');

    const viewPosts = () => {
        form.classList.add('invisible')
        profile.classList.add('invisible')
        postBlock.classList.remove('invisible')
    }

    const viewName = () => {

        form.classList.add('invisible')
        postBlock.classList.add('invisible')
        profile.classList.remove('invisible')
    }

    const viewForm = () => {
        postBlock.classList.add('invisible')
        profile.classList.add('invisible')
        form.classList.remove('invisible')
    }

    return (
        <main>
            {!Auth.isLoggedIn(cookies.token) ?
             <div id={styles.main}>
                <Nav/>
                
             </div>
            : 
            <div id={styles.main}>
                <Nav user={decodedToken}/>
                <button onClick={viewForm}>form</button>
                <button onClick={viewPosts}>posts</button>
                <button onClick={viewName}>profile</button>

                <div id={styles.content} className='p-4'>
                    <div data-id='form' id={styles.block} className="invisible d-flex flex-column align-items-center">

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
                    <div data-id='posts' id={styles.midBlock} className='text-center'>
                        {!posts ? 'Feed empty': 
                            <div>
                                {posts.map((post, index) => {
                                    return (
                                        <PostCard user={decodedToken} key={index} postData={post}/>
                                    )
                                })}
                            </div>
                        }
                    </div>
                    <div data-id='profile' id={styles.block} className="invisible d-flex flex-column align-items-center">

                    </div>
                </div>
            </div> }
        </main>
    )
}

export default Home;