import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

import styles from './Nav.module.css'
const Nav = ({ user }) => {

    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    let letter;
    let userLink;
    if(user) {
        letter = user.username.split('')[0].toUpperCase();
        userLink = `/users/${user._id}`
    }

    const logout = (event) => {
        event.preventDefault()
        removeCookie('token',{path:'/'});
    }

    return (
        <nav id={styles.mainNav} className="navbar navbar-expand-sm navbar-dark">
            <div className="container-fluid text-center">
                <a className="navbar-brand col-4" id={styles.title} href="/">BugBook</a>
                
                {!user ? 
                    <div>
                        <Link id={styles.login} to="/signup" className="fw-bold">Register</Link>/<Link id={styles.login} to="/login" className="fw-bold">Login</Link>
                    </div> 
                        : 
                    <div id={styles.navRight}>
                        <Link id={styles.letter} to={userLink} className="fw-bold text-center">{letter}</Link>
                        <i id={styles.logout} className="bi bi-door-closed-fill" onClick={logout}></i>
                    </div>
                }
            </div>
            
        </nav>

    )
}

export default Nav;