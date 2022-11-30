import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './UserCard.module.css'

const UserCard = ({ userInfo }) => {
    const url = `/api/users/${userInfo._id}`;
    const letter = userInfo.username.split('')[0].toUpperCase();
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
                    <div id={styles.letterBox}>
                        <div id={styles.letter}>{letter}</div>
                    </div>
                    {user.username ? <h5 id={styles.username}>{user.username}</h5> : <p>no username</p>}
                    
                    <div id={styles.body}>
                            <h4>Bio {!user.bio ? '' : <i id={styles.editBio} className='bi bi-pencil' onClick={editBio}></i> }</h4>
                        
                        {user.bio ?
                            <div>
                                <hr id={styles.hr} />
                                <p id={styles.bioBox}>{user.bio}</p>
                            </div>
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
                        </div>
                    
                </>
            }
        </div>
        
    )
}

export default UserCard;