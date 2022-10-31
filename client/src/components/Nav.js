import { useNavigate, Link } from "react-router-dom";

import styles from './Nav.module.css'
const Nav = ({ user }) => {
    let letter;
    let url
    if(user) {
        letter = user.username.split('')[0].toUpperCase();
        url = `/users/${user._id}`
    }

    return (
        <nav id={styles.mainNav} className="navbar navbar-expand-sm navbar-dark">
            <div className="container-fluid text-center">
                <a className="navbar-brand col-4" id={styles.title} href="/">BugBook</a>
                
                {!user ? 
                    <div>
                        <Link to="/signup" className="fw-bold">Register</Link>/<Link to="/login" className="fw-bold">Login</Link>
                    </div> 
                        : 
                    <Link id={styles.letter} to={url} className="fw-bold text-center">{letter}</Link>
                }
            </div>
            
        </nav>

    )
}

export default Nav;