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
    const [posts, setPosts] = useState(null);
    const [b1, setB1] = useState(false);
    const [b2, setB2] = useState(true);
    const [b3, setB3] = useState(false);

    const getAllPosts = () => {
        console.log('refreshing posts')
        axios({
            method: 'get',
            url: 'http://localhost:3080/api/posts/'
        }).then(res => {
            let postArray = [];
            if(res.data.length === 0) return;
            for(let i = res.data.length-1; i >= 0; i--) { 
                postArray.push(res.data[i]);
            }

            setPosts(postArray)
            setB1(false);
            setB2(true);
            setB3(false);
        }).catch(err => console.log(err))
    }
    useEffect(() => {
        if(!cookies.token) return;

        if(Auth.isTokenExpired(cookies.token)) {
            removeCookie('token');
        } else if(Auth.isLoggedIn(cookies.token)) {
            setDecodedToken(Auth.decodeToken(cookies.token))
            getAllPosts()
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
            console.log('is token')
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
        if(!title || !body) return;
        axios({
            method: 'post',
            url: '/api/posts/post',
            data: {
              title: title,
              body: body,
              user: decodedToken
            }
          }).then(res => {
            getAllPosts();
          })


        // clear form values
        setPostState({
          title: '',
          body: '',
        });
    }

    const arePosts = () => {
        if(!posts ||posts.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    const viewPosts = () => {
        setB1(false);
        setB2(true);
        setB3(false);
    }

    const viewName = () => {
        setB1(false);
        setB2(false);
        setB3(true);
    }

    const viewForm = () => {
        setB1(true);
        setB2(false);
        setB3(false);
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
                <div id={styles.buttons}>
                    <button style={{height : b1 ? '30px' : ''}} id='form' onClick={viewForm}>form</button>
                    <button style={{height : b2 ? '30px' : ''}} id='posts' onClick={viewPosts}>posts</button>
                    <button style={{height : b3 ? '30px' : ''}} id='profile' onClick={viewName}>profile</button>
                </div>

                <div id={styles.content} className='p-4'>
                    <div data-id='form' id={styles.block} className={`d-flex flex-column align-items-center text-center ${!b1 ? 'd-none': ''}`}>

                        <form id={styles.form} onSubmit={submitPost} className="d-flex flex-column justify-space-between align-items-center text-center mx-5">
                            <label htmlFor='title'>Title: </label>
                            <input 
                                onChange={handleChange} 
                                value={postState.title} 
                                id={styles.titleInput}
                                name='title' 
                                type="text" 
                                maxLength='25'
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
                    <div data-id='posts' id={styles.midBlock} className={`text-center ${!b2 ? 'd-none': ''}`}>
                        {!arePosts() ? 'Feed empty': 
                            <div>
                                {posts.map((post, index) => {
                                    return (
                                        <PostCard user={decodedToken} key={index} postData={post} />
                                    )
                                })}
                            </div>
                        }
                    </div>
                    <div data-id='profile' id={styles.block} className={`d-flex flex-column align-items-center ${!b3 ? 'd-none': ''}`}>

                    </div>
                </div>
            </div> }
        </main>
    )
}

export default Home;