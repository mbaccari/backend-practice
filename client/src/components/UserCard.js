import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './UserCard.module.css'

const UserCard = ({ userInfo, token }) => {
    const url = `https://bugbook.herokuapp.com/api/users/${userInfo._id}`;
    const letter = userInfo.username.split('')[0].toUpperCase();
    const [ user, setUser ] = useState(null);
    const [ bioEdit, setBioEdit ] = useState(false)
    const [ bio, setBio ] = useState('')

    const getUser = async () => {
        await axios({
            method: 'get',
            url: url
        }).then(res => {
            if(res.data.length === 0) return;
            const { email, bio, username, _id } = res.data
            setUser({bio:bio, username: username, email: email, id: _id});
        }).catch(err => console.log(err))
    }

    useEffect(() => {
        getUser();
        console.log(token)
        console.log(userInfo)
    }, [])

    const handleChange = (event) => {
        
        setBio(event.target.value)
    }

    const isUserLoggedIn = () => {
        if(token._id === userInfo._id) {
            return true;
        } else if(token._id !== userInfo._id) {
            return false;
        }
    }

    const editBio = (event) => {
        event.preventDefault();
        if(bioEdit === true) {
            setBioEdit(false)
        } else if(bioEdit === false) {
            setBioEdit(true)
        }
        setUser({...user, bio: ''})
    }    
    const bioChange = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: 'https://bugbook.herokuapp.com/api/users/editUser',
            data: {
              id: user.id,
              edit: 'bio',
              payload: bio
            }
          }).then((res) => {
            setUser({...user, bio: bio})
            if(bioEdit === true) {
                setBioEdit(false)
            } else if(bioEdit === false) {
                setBioEdit(true)
            }
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
                            <h4>Bio {bioEdit ? '' : 
                            
                            <>
                                {!isUserLoggedIn() ? '': 
                                <i id={styles.editBio} className='bi bi-pencil' onClick={editBio}></i> 
                                }
                                
                            </>

                            
                            }</h4>
                        

                        {!bioEdit ?
                            <div>
                                <hr id={styles.hr} />
                                <p id={styles.bioBox}>{user.bio}</p>
                            </div>
                        :
                            <form id={styles.form} onSubmit={bioChange}>
                                <textarea
                                    id={styles.bioForm}
                                    name="bio"
                                    value={bio}
                                    onChange={handleChange}
                                />
                                <button id={styles.bioButton} type='submit'>Save</button>
                            </form>
                        }
                        </div>
                    
                </>
            }
        </div>
        
    )
}

export default UserCard;