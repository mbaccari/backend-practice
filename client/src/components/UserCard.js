import { useEffect, useState } from 'react'
import axios from 'axios'

const UserCard = ({ userInfo }) => {
    const url = `/api/users/${userInfo._id}`;
    const [ user, setUser ] = useState(null);
    const [ bio, setBio ] = useState('')

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

    const handleChange = (event) => {
        
        setBio(event.target.value)
        console.log(bio)
    }
    
    const bioChange = (event) => {
        event.preventDefault();
        console.log(bio)
        axios({
            method: 'post',
            url: '/api/users/editUser',
            data: {
              id: user._id,
              edit: 'bio',
              payload: bio
            }
          }).then((res) => {
            console.log(res)
          })
    }

    return (
        <>
            {!user ? <p>no user</p> : 
                <>
                    <p>Email: {user.email}</p>
                    <p>Username: {userInfo.username}</p>
                    {user.bio ? <p>{user.bio}</p> : 'user has no bio'}
                    <form onSubmit={bioChange}>
                    <textarea
                        id="bio"
                        name="bio"
                        value={bio}
                        onChange={handleChange}
                    />
                        <button type='submit'>Add bio</button>
                    </form>
                </>
            }
        </>
        
    )
}

export default UserCard;