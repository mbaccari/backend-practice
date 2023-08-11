import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie'

import styles from './Nav.module.css'
const Nav = ({ user, page }) => {

    const [ removeCookie ] = useCookies(['token']);
    let letter;
    let userLink;
    if(user) {
        letter = user.username.split('')[0].toUpperCase();
        userLink = `/users/${user._id}`
    }

    const logout = (event) => {
        // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // removeCookie('token',{path:'/'});
        // cookie.remove('token')
        Cookies.remove('token')
        console.log('uwuw')
        window.location.reload()
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
                <Link className="navbar-brand col-4" id={styles.title} to="/">BugBook</Link>
                
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