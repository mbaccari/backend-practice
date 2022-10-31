import styles from './PostCard.module.css'
import { Link } from "react-router-dom";


const PostCard = ({ postData, index }) => {
    const userLink = `/users/${postData.userId}`
    
    return (
        <div id={styles.post}>
            <div id={styles.postedBy}>
                <Link id={styles.user} to={userLink} className="fw-bold">{postData.username}</Link>
                <div id={styles.time}>{postData.time}</div>
            </div>
            
            <div id={styles.body}>
                <h1>{postData.title}</h1>
                <hr id={styles.hr} />
                <p>{postData.body}</p>
            </div>

            <div>
                <p id={styles.date}>{postData.date}</p>
            </div>
        </div>
    )
}

export default PostCard;