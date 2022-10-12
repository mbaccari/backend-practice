import styles from './PostCard.module.css'


const PostCard = ({ postData }) => {
    
    return (
        <div id={styles.post}>
            <div id={styles.postedBy}>
                <p id={styles.user}>User</p>
                <p id={styles.time}>6:30 p.m.</p>
            </div>
            
            <div id={styles.body}>
                <h1>{postData.title}</h1>
                <hr id={styles.hr} />
                <p>{postData.body}</p>
            </div>

            <div>
                <p id={styles.date}>{postData.created}</p>
            </div>
        </div>
    )
}

export default PostCard;