import styles from './PostCard.module.css';
import { Link } from "react-router-dom";
import axios from 'axios';


const PostCard = ({ postData, user, index }) => {
    const userLink = `/users/${postData.userId}`
    const letter = postData.username.split('')[0].toUpperCase();

    const isUser = () => {
        if(postData.userId === user._id) {
            return true;
        } else {
            return false;
        }
    }

    const deletePost = (event) => {
        axios({
            method: 'delete',
            url: '/api/posts/delete',
            data: {
              id: event.target.dataset.id
            }
          }).then(res => {
            console.log(res)
          })
        console.log(event.target.dataset.id)
    }
    
    return (
        <div id={styles.post}>
            <div id={styles.postedBy}>
                
            <div id={styles.time}>{postData.time}</div>
            </div>
            
            <div id={styles.body}>
                <div id={styles.top}>
                    <div id={styles.letterBox}>
                        <Link id={styles.letter} to={userLink}>{letter}</Link>
                    </div>
                    
                    <h1 id={styles.title}>{postData.title}</h1>
                </div>
                
                <hr id={styles.hr} />
                <p>{postData.body}</p>
            </div>

            <div>
                <p id={styles.date}>{postData.date}</p>
                {isUser() ? <i id={styles.delete} data-id={postData._id} className="bi bi-trash-fill" onClick={deletePost}></i> : <></>}
            </div>
        </div>
    )
}

export default PostCard;