import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import PostCard from '../components/PostCard';
import axios from 'axios';

import Api from '../utils/Api'

import Auth from '../utils/Auth';

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ user, setUser ] = useState();
    const [posts, setPosts] = useState(null);
    const [decodedToken, setDecodedToken] = useState('');
    const getUser = `/api/users/${useParams().userId}`;
    const getPosts = `/api/posts/userposts/${useParams().userId}`
    
    useEffect(() => {
        if(cookies.token) {
            if(Auth.isTokenExpired(cookies.token)) {
                removeCookie('token',{path:'/'});
            } else if(Auth.isLoggedIn(cookies.token)) {
                setDecodedToken(Auth.decodeToken(cookies.token))
            }
        }
        axios({
            method: 'get',
            url: getUser
          }).then(res => {
            console.log(res.data)
            if(res.data.length === 0) return;
            axios({
                method: 'get',
                url: getPosts
            }).then(res => {
                let postArray = [];
                if(res.data.length === 0) return;
                for(let i = res.data.length-1; i >= 0; i--) { 
                    postArray.push(res.data[i]);
                }
                setPosts(postArray)
            })
            setUser(res.data)
          }).catch(err => console.log(err))

    }, []);
    
    const arePosts = () => {
        if(!posts ||posts.length === 0) {
            return false;
        } else {
            return true;
        }
    }

    return (
        <div>
            {!user ?
                <>
                    <div>Loading</div>
                </>
                
                :
                <>
                    {decodedToken ? <div>Logged in</div>
                        :
                        <div>Not logged in</div>
                    }
                    <div>{user.username}</div>
                    <div>{user.email}</div>
                    {!arePosts() ? 'Feed empty': 
                            <div>
                                {posts.map((post, index) => {
                                    return (
                                        <PostCard user={decodedToken} key={index} postData={post} />
                                    )
                                })}
                            </div>
                        }
                </>
            }
        </div>
    )
}

export default Profile;