import { useEffect, useState } from 'react'
import axios from 'axios'

const UserCard = ({ userInfo }) => {
    const url = `/api/users/${userInfo._id}`;
    const [ user, setUser ] = useState(null);

    const getUser = async () => {
        await axios({
            method: 'get',
            url: url
        }).then(res => {
            if(res.data.length === 0) return;
            console.log(res.data)
            setUser(res.data);
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <>
            {!user ? <p>no user</p> : 
                <>
                    <p>Email: {user.email}</p>
                    <p>Username: {userInfo.username}</p>
                </>
            }
        </>
        
    )
}

export default UserCard;