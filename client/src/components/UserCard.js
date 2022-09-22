import axios from 'axios'
import decode from 'jwt-decode'

const UserCard = ({ token }) => {
    const decoded = decode(token);
    console.log(decoded)
    return (
        <p>{decoded}</p>
    )
}

export default UserCard;