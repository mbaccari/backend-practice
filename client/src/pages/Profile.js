import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

import Api from '../utils/Api'

import Auth from '../utils/Auth';

const Profile = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [ user, setUser ] = useState();
    const [decodedToken, setDecodedToken] = useState('');
    const queryLink = `http://localhost:3080/api/users/${useParams().userId}`
    
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
            url: queryLink
          }).then(res => {
            console.log(res.data)
            if(res.data.length === 0) return;
            setUser(res.data)
          }).catch(err => console.log(err))

    }, []);
    

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
                </>
            }
        </div>
    )
}

export default Profile;