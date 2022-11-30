import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './UserCard.module.css'

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
            const { email, bio, username, _id } = res.data
            setUser({bio:bio, username: username, email: email, id: _id});
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getUser();
    }, [])

    const handleChange = (event) => {
        
        setBio(event.target.value)
        console.log(bio)
    }

    const editBio = (event) => {
        event.preventDefault();
        setUser({...user, bio: ''})
    }    
    const bioChange = (event) => {
        event.preventDefault();
        console.log(bio)
        axios({
            method: 'post',
            url: '/api/users/editUser',
            data: {
              id: user.id,
              edit: 'bio',
              payload: bio
            }
          }).then((res) => {
            setUser({...user, bio: bio})
          })
    }

    return (
        <div id={styles.container}>
            {!user ? <p>no user</p> : 
                <>
                    {user.email ? <p>{user.email}</p> : <p>no email</p>}
                    {user.username ? <p>{user.username}</p> : <p>no username</p>}
                    {user.bio ?
                        <div><p>{user.bio}</p><button onClick={editBio}>Edit</button></div>
                    :
                        <form onSubmit={bioChange}>
                            <textarea
                                id="bio"
                                name="bio"
                                value={bio}
                                onChange={handleChange}
                            />
                            <button type='submit'>Add bio</button>
                        </form>
                    }
                </>
            }
        </div>
        
    )
}

export default UserCard;