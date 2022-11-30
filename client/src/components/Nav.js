import { useNavigate, Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

import styles from './Nav.module.css'
const Nav = ({ user, page }) => {

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

    const checkPage = () => {
        if(page === 'home') {
            return true;
        } else if(page === 'profile') {
            return false;
        }
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
                        {!checkPage() ? 
                            <Link id={styles.letter} to={userLink} className="fw-bold text-center">{letter}</Link>
                        :
                            <Link id={styles.home} className='bi bi-house-fill' to={'/'}></Link>
                        }
                        <i id={styles.logout} className="bi bi-door-closed-fill" onClick={logout}></i>
                    </div>
                }
            </div>
            
        </nav>

    )
}

export default Nav;